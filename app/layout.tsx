import type { Metadata } from 'next'
import { Roboto, Roboto_Mono } from 'next/font/google'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import './globals.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GuoXiangwen - 个人网站',
  description: '分享设计、技术与思考',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${roboto.variable} ${robotoMono.variable} font-sans antialiased bg-white dark:bg-black`}
      >
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
