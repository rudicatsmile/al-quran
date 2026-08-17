import { auth, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-accent/20">
      <header className="flex h-16 items-center justify-between border-b bg-card px-6 w-full max-w-4xl mx-auto shadow-sm">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium hover:underline text-primary">Ke Halaman Utama</Link>
          <form action={async () => {
            "use server"
            await signOut()
          }}>
            <button className="rounded-md bg-destructive px-3 py-1.5 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90">Logout</button>
          </form>
        </div>
      </header>
      <main className="flex-1 p-6 w-full max-w-4xl mx-auto">{children}</main>
    </div>
  )
}
