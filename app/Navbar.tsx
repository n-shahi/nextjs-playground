'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  const { status, data: session } = useSession();

  return (
    <div className='bg-slate-100'>
      <nav>
        <ul className='flex p-5'>
          <li><Link href="/" className='m-5'>Home</Link></li>
          <li><Link href="/users" className='m-5'>Users</Link></li>
          <li><Link href="/admin" className='m-5'>Admin</Link></li>
          { status ==='loading' && <li><div>Loading...</div></li>}
          { status === 'authenticated' && 
          <li>
            {session.user?.name}
            <Link href="/api/auth/signout" className='m-5'>Sign Out</Link>
          </li>}
          { status === 'unauthenticated' && <li><Link href="/api/auth/signin" className='m-5'>Sign In</Link></li>}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
