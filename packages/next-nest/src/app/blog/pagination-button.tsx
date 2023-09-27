'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import { usePage } from '@src/contexts/blogpost-page';
import NextPrevBtn from '@src/components/next-button';

// const randomNumber = (min: number, max: number) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

export function BlogPagination() {
  const location = usePathname();
  const pageContext = usePage()

  const router = useRouter()
  const [page,setPage] = useState(parseInt(location.split('/')[2] ?? '0'))
  const [totalPage,setTotalPage] = useState(1)

  useEffect(() => {
    fetch(`http://localhost:3000/api/blogposts?postCount=5&format=length`)
    .then(res => res.json())
    .then(res => {
      setTotalPage(res.length)
    })

  },[])

  function handleNextPage() {
    console.log('next')
    if (page < totalPage - 1) {
      router.push(`/blog/${page + 1}`)
      pageContext.setPage(page + 1)
      setPage(page + 1)
      console.log(page)
    }
  }

  function handlePrevPage() {
    console.log('prev')
    if (page > 0) {
      router.push(`/blog/${page - 1}`)
      pageContext.setPage(page - 1)
      setPage(page - 1)
    }
  }

  return (
    <div className='flex flex-wrap items-center gap-2 justify-center'>
      <div className='grid grid-cols-2 gap-4'>
        <NextPrevBtn onClick={handlePrevPage}>PREV</NextPrevBtn>
        <NextPrevBtn onClick={handleNextPage}>NEXT</NextPrevBtn>
      </div>
    </div>
  );
}