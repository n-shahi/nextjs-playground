'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, DropdownMenu, Flex, Text } from '@radix-ui/themes';


const NavBar = () => {
  const { status, data: session } = useSession();
  const currentPath = usePathname()
  const navList = [
    { name: 'Issues', href: '/issues/list' },
    { name: 'Dashboard', href: '/dashboard' },
  ]
  return (
    <nav className='flex space-x-6 border-b mb-5 h-14 items-center justify-between'>
      <Flex align='center' gap='2'>
        <Link href='/'><FaBug /></Link>
        <ul>
          <li className='flex space-x-6'>
            {navList.map(item =>
              <Link
                key={item.href}
                href={item.href}
                // className={`${currentPath === item.href ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}
                className={classnames({
                  'text-zinc-900': currentPath === item.href,
                  'text-zinc-500': currentPath !== item.href,
                  'border-b-2': currentPath === item.href,
                  'hover:text-zinc-800': true,
                  'transition-colors': true,
                })}
              >{item.name}</Link>
            )}
          </li>
        </ul>
      </Flex>
      <Box>
        {status === 'loading' && <div>Loading...</div>}
        {status === 'authenticated' &&
          // <Text>{session.user!.name} <Link href="/api/auth/signout" className='m-5'>Sign Out</Link></Text>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar src={session.user!.image!} fallback="?" radius='full' size='2' className='cursor-pointer'/>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text>{session.user?.email}</Text>
              </DropdownMenu.Label>

              <DropdownMenu.Item>
                <Link href="/api/auth/signout">Sign Out</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        }
        {status === 'unauthenticated' && <Link href="/api/auth/signin" className='m-5'>Sign In</Link>}
      </Box>
    </nav>
  )
}

export default NavBar
