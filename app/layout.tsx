import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { GeistSans, GeistMono } from 'geist/font'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

const inter = Inter({ subsets: ['latin'] })
// const geist = GeistSans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Vercelian Profile',
  description: 'Generated by create next app',
}

import NavBar from './components/NavBar'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <div className="fixed top-1 left-[35%] w-1/3 flex justify-center bg-white rounded-full">
        <p className="italic py-2">add a navbar?</p>
      </div> */}
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
