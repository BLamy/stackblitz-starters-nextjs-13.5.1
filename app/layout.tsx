import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'A basic issue tracking application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
