## NextJS Priject: Build an Issue Tracker

### Getting Started
- we will build and deploy a full stack, Production grade issue tracker
- which includes all the common features in modern applications like dashboard with chars, filtering, sorting, pagination, forms with client side validation, user authentication and access control, model dialog boxs, toast etc
- Using cutting-edge tech stack: NextJS, TypeScript, Tailwind, RadixUI, Prisma, NextAuth. 

### Prerequisites
- go through part1 of this series which includes
    - Client and server side components
    - Routing
    - Building APIs
    - Database integration with Prisma
    - Authentication with NextJS
- Basics of Tailwind


### Source code: https://github.com/mosh-hamedani/issue-tracker

## Setting Up the Project
### Project Roadmap
- Categorize features in to Core/Advance
- Core: Essential features
    - Creating an issue
    - Viewing issues
    - Updating an issue
    - Deleting an issue

- Advance: Nice to have features
    - User Authentication
    - Assigning issues
    - Sorting issues
    - Filtering issues
    - Pagination
    - Dashboard
- Focus One feature at a time
- There is no such thing as "perfect" in software, so don't worry about perfection
- being an perfection waste a lot of time
- So, Make it work first, Then improve it.

### Setting up Development Environment
- Download VSCode
- install ES7/Redux/RN snippets, Typescript, Tailwind, Prisma

### Creating the Project 
- create project: npx create-next-app@13.4.18
- goto project page: cd ./project
- start project: npm run dev
- do cleanup: page.tsx, global.css
- commit changes

### Building the Navbar
- create app/Navbar.tsx and import to layout.tsx
- creating in app folder to colocate with page as it's used in only main page.
- use usePathname hook from next/navigation to get current path
- use react-icons for icons: https://react-icons.github.io/react-icons/
- use classnames for clean classname: npm i classnames

```tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';

const NavBar = () => {
  const currentPath = usePathname()
  const navList = [
    { name: 'Issue', href: '/issue' },
    { name: 'Dashboard', href: '/dashboard' }
  ]
  return (
    <nav className='flex space-x-6 border-b p-5 mb-5 h-14 items-center'>
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
```

## Creating Issues
### Setting up MySQL: goto part 1
### Settin up Prisma
- install: npm i prisma
- npx prisma init
- update privider, url
- create issue model and migrate
- create client 

### Building an API
- issue zod for data validation and create api/issues/route.ts



