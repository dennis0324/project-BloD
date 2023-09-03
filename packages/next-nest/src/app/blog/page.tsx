import { BloDSocketIO } from '@src/client/socket-io'
import React from 'react'

export default async function Page(){
  const data = await getData()
  return (
    <div>

    </div>
  )
}

//Get: nest -> next
//post: next -> nest
async function getData() {
  // 데이터 받아달라고 요청

  BloDSocketIO.getPolls().on('connect',() => {
    // 데이터 수신
    BloDSocketIO.getPolls().on('blog:nsnx:title',(data) => {
      console.log(data)
    })
  })
  BloDSocketIO.getPolls().emit('blog:nxns:title',{routePath:'blog'})

  // BloDSocketIO.getPolls().close()
  
  // const res = await fetch('https://api.example.com/...')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }
 
  return 'hello'
}