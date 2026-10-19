import type { Metadata } from 'next'
import './globals.css'
import './brand.css'
import { StoreProvider } from '@/components/store-provider'
import { StoreShell } from '@/components/store-shell'

export const metadata: Metadata = { title: 'BARK — Entrena sin límites', description: 'Suplementación deportiva, equipo y beneficios exclusivos BARK.' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body><StoreProvider><StoreShell>{children}</StoreShell></StoreProvider></body></html> }
