import Link from 'next/link'
import { Switch } from "@/components/ui/switch"

const NavBar = () => {
  return (
    <nav>
      <ul className="flex gap-4 bg-black text-white">
        <li>
          <Link href="/">
            <h1>Home</h1>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <h1>Blog</h1>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar