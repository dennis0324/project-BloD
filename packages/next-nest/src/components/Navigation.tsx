import Link from "next/link"

export const Navigation = () => {
  return (
    <nav>
      <div className="nav-selection">
        <Link className="navlink" href={'/'}>Home</Link>
      </div>
      <div className="nav-selection">
        <Link className="navlink" href={'/blog'}>Post</Link>
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