import type { Metadata, Viewport } from 'next'
import { Kanit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const kanit = Kanit({ 
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit"
});

export const metadata: Metadata = {
  title: 'COM7 สงกรานต์ชื่นบุญ',
  description: 'ร่วมทำบุญสงกรานต์กับ COM7 พร้อมเสี่ยงทายเซียมซี',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#D4AF37',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th">
      <body className={`${kanit.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
