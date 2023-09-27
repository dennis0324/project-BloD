'use client'
import React from "react"
import { usePathname } from "next/navigation"
import "./index.css"
import LogoPic from "./logo"

export type Mode = 'main' | 'footer'

// type props = {
//     mode:Mode
// }

function logo({className,mode}:{className?:string,mode:Mode}){
    
    const location = usePathname()
    return (location !== '/'|| mode === 'main') ? <LogoPic className={className}/> : ''        
}

export default logo