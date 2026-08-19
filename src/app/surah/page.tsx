import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SurahIndex } from "@/components/surah/SurahIndex"
import { JuzIndex } from "@/components/surah/JuzIndex"
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function SurahPage() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-background relative">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center gap-3">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-accent text-foreground transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-lg font-bold">Indeks Al-Quran</h1>
        </div>
      </header>
      
      <div className="flex-1 w-full flex flex-col">
        <Tabs defaultValue="surah" className="w-full flex-1 flex flex-col">
          <div className="sticky top-[60px] z-40 bg-background/95 backdrop-blur-sm p-4 pb-3 border-b border-border/50">
            <TabsList className="grid w-full grid-cols-2 p-1 bg-accent/50 rounded-full h-12">
              <TabsTrigger value="surah" className="rounded-full h-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm text-sm font-medium">Berdasarkan Surah</TabsTrigger>
              <TabsTrigger value="juz" className="rounded-full h-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm text-sm font-medium">Berdasarkan Juz</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="surah" className="flex-1 m-0 focus-visible:outline-none p-0">
            <SurahIndex />
          </TabsContent>
          <TabsContent value="juz" className="flex-1 m-0 focus-visible:outline-none p-0">
            <JuzIndex />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
