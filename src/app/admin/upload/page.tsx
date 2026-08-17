"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [linkUrl, setLinkUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      alert("Silakan pilih gambar terlebih dahulu")
      return
    }

    setIsLoading(true)
    const formData = new FormData()
    formData.append('image', file)
    formData.append('linkUrl', linkUrl)

    try {
      const res = await fetch('/api/admin/slideshow', {
        method: 'POST',
        body: formData, // fetch will automatically set the correct multipart/form-data headers
      })

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        alert("Gagal menambahkan slideshow")
      }
    } catch (err) {
      alert("Terjadi kesalahan")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-card p-6 rounded-xl border border-border/50 shadow-sm max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Tambah Slideshow</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Unggah Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            required
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground mt-1">Pilih gambar langsung dari perangkat Anda.</p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Link Tujuan (Opsional)</label>
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://..."
            className="rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground mt-1">URL yang akan dibuka saat gambar diklik.</p>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium hover:underline text-muted-foreground"
            disabled={isLoading}
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {isLoading ? "Mengunggah..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  )
}
