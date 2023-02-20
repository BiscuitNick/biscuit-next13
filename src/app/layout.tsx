"use client"
import React from 'react'
import './globals.css'
import NavigationBar from '../components/Layouts/NavigationBar'

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
        <NavigationBar />

        {children}
      </body>
    </html>
  )
}
