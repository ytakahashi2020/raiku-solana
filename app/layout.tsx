import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LocaleProvider } from "@/lib/locale-context"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Raiku Network Monitor",
  description: "Blockchain transaction monitoring and simulation dashboard",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <LocaleProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <Navigation />
            <main className="flex-1">{children}</main>
          </div>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  )
}
