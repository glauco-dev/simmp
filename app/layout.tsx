import type { Metadata } from 'next'
import Head from 'next/head'
import Nav from './components/Nav'
import "./styles.sass"
import 'leaflet/dist/leaflet.css'
 import dynamic from "next/dynamic"



export const metadata: Metadata = {
  title: 'SIMMP - Sindicato do Magistério Municipal Público de Vitória da Conquista',
  description: 'Sindicato do Magistério Municipal Público de Vitória da Conquista',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <body>
        <Nav></Nav>
        <div id="slot">
          {children}
        </div>
      </body>
    </html>
  )
}
