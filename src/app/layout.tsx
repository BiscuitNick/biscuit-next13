import React from 'react'
import './globals.css'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Link href='/'><button>Home</button></Link>
        <Link href='/docs'><button>Docs</button></Link>
        <Link href='/templates'><button>Templates</button></Link>
        <Link href='/demo'><button>Demo</button></Link>
        <Link href='/about'><button>About</button></Link>
        {children}
      </body>
    </html>
  )
}
