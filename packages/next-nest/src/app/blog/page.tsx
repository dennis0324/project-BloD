'use client'
import { usePage } from '@src/contexts/blogpost-page'
import { useRouter } from 'next/navigation'

// redirect to pagniation poage
export default async function Page(){
  // usePage context has history of last page only in blog section
  const {page} = usePage()
  const router = useRouter()
  router.push(`/blog/${page}`)
}