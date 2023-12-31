import type { Metadata } from 'next'
import { Alegreya } from 'next/font/google'
import './globals.css'

const alegreya = Alegreya({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={alegreya.className}>{children}</body>
    </html>
  )
}
