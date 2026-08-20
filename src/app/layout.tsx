import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClientInit } from "@/components/providers/client-init";
import { AudioProvider } from "@/components/providers/audio-provider";
import { BottomNav } from "@/components/navigation/BottomNav";
import { Drawer } from "@/components/navigation/Drawer";
import { MiniPlayer } from "@/components/audio/MiniPlayer";
import { SettingsSheet } from "@/components/navigation/Bottomsheet/SettingsSheet";
import { TafsirSheet } from "@/components/navigation/Bottomsheet/TafsirSheet";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quran Web App",
  description: "Aplikasi membaca Al-Quran Mobile-First",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground pb-[env(safe-area-inset-bottom)]">
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ClientInit />
            <AudioProvider />
            <div className="flex flex-col min-h-screen max-w-md mx-auto w-full relative bg-background shadow-sm border-x border-border/50">
              <main className="flex-1 pb-16">{children}</main>
              <Drawer />
              <SettingsSheet />
              <TafsirSheet />
              <MiniPlayer />
              <BottomNav />
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
