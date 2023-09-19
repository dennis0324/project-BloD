'use client'
import { usePage } from "@src/contexts/blogpost-page";
import Link from "next/link"
import { useRouter } from "next/navigation";

export const Navigation = () => {
  const router = useRouter()
  const {page} = usePage()

  return (
    <nav>
      <div className="nav-selection">
        <a className="navlink" onClick={() => router.push('/')}>Home</a>
      </div>
      <div className="nav-selection">
        <a className="navlink" onClick={() => router.push(`/blog/${page}`)}>Posts</a>
      </div>
      <div className="nav-selection">
        <Link className="navlink" href={'/project'}>Project</Link>
      </div>
      <div className="nav-selection">
        <Link className="navlink" href={'/'}>About Me</Link>
      </div>
    </nav>
  )
}