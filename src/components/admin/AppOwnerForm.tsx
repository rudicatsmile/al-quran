"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function AppOwnerForm({ initialValue }: { initialValue: string }) {
  const [value, setValue] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'appName', value }),
      })

      if (res.ok) {
        alert("Berhasil disimpan!")
        router.refresh()
      } else {
        alert("Gagal menyimpan")
      }
    } catch (error) {
      alert("Terjadi kesalahan")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-card p-6 rounded-xl border border-border/50 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
      <div>
        <h2 className="text-xl font-bold">Nama / Pemilik Aplikasi</h2>
        <p className="text-muted-foreground text-sm">Teks ini akan tampil di bagian paling atas aplikasi (di samping logo).</p>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
        <input 
          type="text" 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Misal: Yayasan XYZ"
          className="rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64"
          required
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/90 disabled:opacity-50 whitespace-nowrap"
        >
          {isLoading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  )
}
