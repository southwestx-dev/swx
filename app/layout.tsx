import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CustomCursor from './cursor'
import ContactModal from './contact-modal'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'SouthwestX — Where Innovation Meets Opportunity',
  description:
    'Bridging visionary founders with industry leaders in the heart of Germany\'s most dynamic startup ecosystem.',
  openGraph: {
    title: 'SouthwestX',
    description: 'Where startups scale. Where companies innovate.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <CustomCursor />
        <ContactModal />
        {children}
      </body>
    </html>
  )
}
