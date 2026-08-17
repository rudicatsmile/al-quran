import { serverDb } from '@/lib/db/postgres'
import { slideshows, settings } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import Link from 'next/link'
import { AppOwnerForm } from '@/components/admin/AppOwnerForm'

export default async function AdminPage() {
  const slides = await serverDb.select().from(slideshows).orderBy(desc(slideshows.createdAt))
  
  const appNameSetting = await serverDb
    .select()
    .from(settings)
    .where(eq(settings.key, 'appName'))
    .limit(1)
    .catch(() => [])
  
  const currentAppName = appNameSetting.length > 0 ? appNameSetting[0].value : 'Quran'

  return (
    <div className="flex flex-col gap-6">
      <AppOwnerForm initialValue={currentAppName} />

      <div className="flex justify-between items-center bg-card p-6 rounded-xl border border-border/50 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold">Slideshow</h2>
          <p className="text-muted-foreground text-sm">Kelola gambar banner di halaman beranda.</p>
        </div>
        <Link href="/admin/upload" className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium transition-colors hover:bg-primary/90">
          + Tambah Slide
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-card rounded-xl border border-border/50 overflow-hidden shadow-sm flex flex-col">
            <img src={slide.imageUrl} alt="Slide" className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">Link: <a href={slide.linkUrl || '#'} className="text-primary hover:underline">{slide.linkUrl || '-'}</a></p>
              <div className="flex justify-between items-center mt-2">
                <span className={`text-xs px-2 py-1 font-medium rounded-full ${slide.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                  {slide.isActive ? 'Aktif' : 'Tidak Aktif'}
                </span>
                <button className="text-destructive text-sm font-medium hover:underline">Hapus</button>
              </div>
            </div>
          </div>
        ))}
        {slides.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-card rounded-xl border border-border/50 border-dashed">
            Belum ada slideshow. Silakan tambah baru.
          </div>
        )}
      </div>
    </div>
  )
}
