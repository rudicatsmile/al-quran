import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

console.log("🚀 Preparing mobile build for Capacitor...")
const filesToHide = [
  'src/app/admin/page.tsx',
  'src/app/admin/layout.tsx',
  'src/app/admin/upload/page.tsx',
  'src/app/api/admin/settings/route.ts',
  'src/app/api/admin/slideshow/route.ts',
  'src/app/api/auth/[...nextauth]/route.ts'
]

// 1. Rename to hide server components
filesToHide.forEach(p => {
  if (fs.existsSync(p)) {
    console.log(`Hiding ${p}...`)
    try {
      fs.renameSync(p, p + '.hidden')
    } catch (e) {
      console.error(`Failed to hide ${p}`, e.message)
    }
  }
})

// Patch dynamic pages
const pagesToPatch = ['src/app/page.tsx', 'src/app/surah/page.tsx']
const originalContents = {}

pagesToPatch.forEach(pagePath => {
  if (fs.existsSync(pagePath)) {
    console.log(`Patching ${pagePath} to allow static export...`)
    const content = fs.readFileSync(pagePath, 'utf8')
    originalContents[pagePath] = content
    const patchedContent = content.replace(/export const dynamic = 'force-dynamic'/g, '// export const dynamic = "force-dynamic"')
    fs.writeFileSync(pagePath, patchedContent, 'utf8')
  }
})

try {
  console.log("🏗️  Running next build with output: export...")
  execSync('npm run build', { 
    stdio: 'inherit', 
    env: { ...process.env, MOBILE_BUILD: 'true' } 
  })
  console.log("✅ Build successful!")
} catch (error) {
  console.error("❌ Build failed!")
} finally {
  // 2. Restore
  console.log("♻️  Restoring hidden files...")
  filesToHide.forEach(p => {
    if (fs.existsSync(p + '.hidden')) {
      try {
        fs.renameSync(p + '.hidden', p)
      } catch(e) {
        console.error(`Failed to restore ${p}`, e.message)
      }
    }
  })
  
  // Restore patched pages
  Object.keys(originalContents).forEach(pagePath => {
    try {
      fs.writeFileSync(pagePath, originalContents[pagePath], 'utf8')
      console.log(`Restored ${pagePath}`)
    } catch(e) {
      console.error(`Failed to restore ${pagePath}`, e.message)
    }
  })
}
