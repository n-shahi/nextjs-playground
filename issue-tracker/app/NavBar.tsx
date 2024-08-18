'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

const NavBar = () => {
  return (
    <nav className='flex space-x-6 border-b mb-5 h-14 items-center justify-between'>
      <NavLink />
      <AuthStatus />
    </nav>
  )
}

const NavLink = () => {
  const currentPath = usePathname()

  const navList = [
    { name: 'Dashboard', href: '/' },
    { name: 'Issues', href: '/issues/list' },
  ]
  return (
    <Flex align='center' gap='4'>
        <Link href='/'><FaBug /></Link>
        <ul>
          <li className='flex space-x-6'>
            {navList.map(item =>
              <Link
                key={item.href}
                href={item.href}
                // className={`${currentPath === item.href ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}
                className={classnames({
                  'nav-link': true,
                  '!text-zinc-900': currentPath === item.href,
                })}
              >{item.name}</Link>
            )}
          </li>
        </ul>
      </Flex>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession()
  if (status === 'loading') return <Skeleton width='4rem' height='1.5rem'/>
  if (status === 'unauthenticated') return <Link href="/api/auth/signin" className='m-5 nav-link'>Sign In</Link>
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar src={session!.user!.image!} fallback="?" radius='full' size='2' className='cursor-pointer' />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text>{session!.user?.email}</Text>
          </DropdownMenu.Label>
          <Link href="/api/auth/signout">
          <DropdownMenu.Item>
            Sign Out
          </DropdownMenu.Item>
          </Link>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

export default NavBar
