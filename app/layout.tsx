import type { Metadata } from 'next'
import { Bowlby_One, Geist, Geist_Mono, Roboto_Condensed } from 'next/font/google'
import './globals.css'
import ThemeRegistry from '@/components/ThemeRegistry'
import PrimaryAppBar from '@/components/PrimaryAppBar'
import BottomNav from '@/components/BottomNav'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const robotoCondensed = Roboto_Condensed({ subsets: ['latin'] });
const bowlbyOne = Bowlby_One({
  subsets: ['latin'],
  weight: '400'
});

export const metadata: Metadata = {
  title: 'StageConnect',
  description: 'Ready to get connected?',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${robotoCondensed.className}`}>
      <body className="antialiased flex flex-col min-h-screen">
        <ThemeRegistry>
          <PrimaryAppBar />
          <main className="flex-grow">{children}</main>
          <BottomNav />
        </ThemeRegistry>
      </body>
    </html>
  )
}
