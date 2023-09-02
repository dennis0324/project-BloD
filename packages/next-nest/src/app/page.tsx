'use client'
import Logo from '@src/components/logo'
async function getData() {
  const res = await fetch('https://api.example.com/...')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

// import "@src/app/globals_notion.css"
export default function Home() {
  // fetch()
  return (
    <Logo mode={"main"}/>
  )
}
