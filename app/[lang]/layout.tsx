import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provider"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/types"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Morocco Real Estate",
  description: "Find your dream property in Morocco",
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const dict = await getDictionary(params.lang)

  return (
    <html lang={params.lang} dir={params.lang === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className="bg-background text-foreground min-h-screen flex flex-col">
            <Navbar lang={params.lang} dict={dict} />
            <main className="flex-1">{children}</main>
            <Footer lang={params.lang} dict={dict} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
