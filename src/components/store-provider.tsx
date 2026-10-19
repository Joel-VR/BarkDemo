'use client'
import { useEffect } from 'react'
import { useCart } from '@/store/cart'
export function StoreProvider({children}:{children:React.ReactNode}){useEffect(()=>{const reset=()=>useCart.getState().reset();window.addEventListener('bark-reset-demo',reset);return()=>window.removeEventListener('bark-reset-demo',reset)},[]);return <>{children}</>}
