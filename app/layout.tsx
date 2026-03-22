import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.passwordmake.com'),
  title: 'Password Generator — Create Strong, Secure Passwords Instantly',
  description:
    'Free online password generator. Create strong, random passwords and passphrases with customizable length and character types. 100% client-side — nothing is sent to any server.',
  openGraph: {
    title: 'Password Generator — Secure & Free',
    description: 'Generate strong passwords instantly. 100% private, runs in your browser.',
    type: 'website',
    url: 'https://www.passwordmake.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Generator — Free & Secure',
    description: 'Create strong, random passwords. No data sent to any server.',
  },
  robots: { index: true, follow: true },
  other: { 'google-adsense-account': 'ca-pub-7584346505499429' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-white antialiased min-h-screen`}>
        {children}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
