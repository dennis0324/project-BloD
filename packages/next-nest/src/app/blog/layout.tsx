import React from 'react'
import { BlogPagination } from './pagination-button'
export default async function Page({
  children,
}: {
  children: React.ReactNode
}){
  return (
    <div className='w-1/2'>
      {children}
      <BlogPagination/>
    </div>
  )
}


// Get tags from discord
async function getTags() {
  const res = await fetch('http://localhost:3000/api/tags',{
    cache: "no-cache" 
  })
}


async function getContribute() {
  //TODO: need to make to process env
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${'dennis0324'}?format=nested`,{
    cache: "no-cache"
  })

  if(!res.ok){
    throw new Error('Failed to fetch data')
  }
  return await res.json()
}