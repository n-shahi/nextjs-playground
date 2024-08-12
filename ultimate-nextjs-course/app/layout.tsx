import './globals.css'
import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import localFont from 'next/font/local'
import Navbar from './Navbar'
import AuthProvider from './auth/Provider'
import GoogleAnalyticsScript from './GoogleAnalyticsScript'

// const font = Inter({ subsets: ['latin'] })
const font = localFont({ 
  src: '../public/fonts/poppins-regular-webfont.woff2',
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Welcome to NextJS Playground',
  description: 'Find out more about NextJS Playground',
  openGraph: {
    type: 'website',
    title: 'NextJS Playground',
    description: 'Find out more about NextJS Playground',
    images: [
      {
        url: 'https://nextjs-playground.vercel.app/images/nextjs-logo.png',
        width: 800,
        height: 600,
      },
    ],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme='winter'>
      <body className={font.variable}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}