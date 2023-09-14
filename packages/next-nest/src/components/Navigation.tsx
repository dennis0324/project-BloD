'use client'
import Link from "next/link"
import { useRouter } from "next/navigation";

export const Navigation = () => {
  const router = useRouter()
  return (
    <nav>
      <div className="nav-selection">
        {/* <Link className="navlink" href={'/'}>Home</Link> */}
        <a className="navlink" onClick={() => router.push('/')}>Home</a>
      </div>
      <div className="nav-selection">
        {/* <Link className="navlink" href={'/blog'}>Post</Link>
         */}
        <a className="navlink" onClick={() => router.push('/blog')}>Posts</a>

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