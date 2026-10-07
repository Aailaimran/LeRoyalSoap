import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Le Royal | Premium Handmade Soaps',
  description: "Discover Le Royal's ingredient-inspired handmade soaps designed for fresh, refined everyday cleansing.",
  icons: {
    icon: '/logo.jpeg',
    shortcut: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f3ea',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
