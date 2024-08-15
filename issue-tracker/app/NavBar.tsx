'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';


const NavBar = () => {
  const currentPath = usePathname()
  const navList = [
    { name: 'Issues', href: '/issues/list' },
    { name: 'Dashboard', href: '/dashboard' },
  ]
  return (
    <nav className='flex space-x-6 border-b mb-5 h-14 items-center'>
      <Link href='/'><FaBug /></Link>
      <ul><li className='flex space-x-6'>
        {navList.map(item =>
          <Link
            key={item.href}
            href={item.href}
            // className={`${currentPath === item.href ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}
            className={classnames({
              'text-zinc-900': currentPath === item.href,
              'text-zinc-500': currentPath!== item.href,
              'border-b-2': currentPath === item.href,
              'hover:text-zinc-800': true,
              'transition-colors': true,
            })}
          >{item.name}</Link>
        )}
      </li>
      </ul>
    </nav>
  )
}

export default NavBar
