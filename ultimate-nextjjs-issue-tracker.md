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

### Setting UP Radix UI
- install: npm install @radix-ui/themes
- ref: https://www.radix-ui.com/themes/docs/overview/getting-started
- use ThemePanel and get required theme

- for font needs to do bit of configuration in radix-ui
- ref: https://www.radix-ui.com/themes/docs/theme/typography

### Adding a Markdown Editor
- npm i react-simplemde-editor
- replace description input with md editor
- ref: https://www.npmjs.com/package/react-simplemde-editor

### Handling Form Submission/Handling errors
- npm i react-hook-form
- ref: https://www.npmjs.com/package/react-hook-form
- npm i axios for handling http requests
- ref: https://www.npmjs.com/package/axios
```tsx
// create form in issues/_components/IssueForm.tsx
'use client'
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import ErrorMessage from '@/app/components/ErrorMessage';

interface IssueForm {
  title: string;
  description: string;
}

const IssueForm = () => {
  const { register, handleSubmit, control} = useForm<IssueForm>();
  const [error, setError] = useState('');
  const router = useRouter()
  return (
    <div className='max-w-3xl space-y-3'>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form
        className='max-w-3xl space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            setError('')
            await axios.post('/api/issues', data);
            router.push('/issues')
          } catch (error) {
            setError('Unexpected error occurred.')
            console.error(error)
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register('title')} />
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        <Button className=''>Submit New Issue</Button>
      </form>
    </div>
  )
}
export default IssueForm


// use it in issues/new/page.tsx
import dynamic from "next/dynamic"

const DynamicIssueForm = dynamic(
  () => import('../_components/IssueForm'), 
  { ssr: false, loading: () => <p>Loading...</p> }
)

const NewIssuePage = () => {
  return (
    <div>
      <h1>Issue Form</h1>
      <DynamicIssueForm />
    </div>
  )
}
export default NewIssuePage
```

### Implementing Client-side Validation
- move schema to generic place 
- npm i @hookform/resolvers@3.3.1 :> allow react hook forms to integrate with various data validation library like zod
- import zodResolver for validation and z.infer to extract types from schema
```tsx
...
import ErrorMessage from '@/app/components/ErrorMessage';
import { zodResolver }  from '@hookform/resolvers/zod'
import { z } from 'zod';
import { createIssueSchema } from '@/app/validation_schema';

type IssueForm = z.infer<typeof createIssueSchema>;

const IssueForm = () => {
  const { register, handleSubmit, control, formState: {errors}} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const router = useRouter()
  console.log(errors)
  return (
    <div className='max-w-3xl space-y-3'>
      <form
        className='max-w-3xl space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues')
          } catch (error) {
            console.error(error)
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register('title')} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button className=''>Submit New Issue</Button>
      </form>
    </div>
  )
}
export default IssueForm
```

### Extracting the ErrorMessage
- make ErrorMessage component and use it 
```tsx
import { Callout, Text } from '@radix-ui/themes';
import React, { PropsWithChildren } from 'react'

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Text as="p" className='text-red-500'>
      {children}
    </Text>
    // <Callout.Root>
    //   <Callout.Text color='red'>
    //     {children}
    //   </Callout.Text>
    // </Callout.Root>
  )
}
export default ErrorMessage
```

### Adding a Spinner
- Add a Spinner in the button while submitting a form

```tsx
// get isSubmitting from formState
// create a Spinner component
formState: { errors, isSubmitting }
<Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
```

### Discussions- Code organization
- better to have inline functions if 1 or 2 lines else make a separate function

- Separateion of concerns: Separ∑ate a program into distinct modules each having a separete concern. 
 
- Software engineering is not a black and white.
- Don't apply other people's solutions as silver bullets. 
- Avoid unnecessary abstraction. Apply if really necessary. 


## Viewing Issues
### Showing the Issues
- use radix table to show fetched issues from database 
```tsx
import prisma from '@/prisma/client'
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssuePage = async () => {
  const issues = await prisma.issue.findMany()
  return (
    <div>
      <div className='mb-5'>
        <Button><Link href='/issues/new'>New Issue</Link></Button>
      </div>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>CreateAt</Table.ColumnHeaderCell>
          </Table.Row>

        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                  <div className='block md:hidden'>
                    {issue.status}
                  </div>
                </Link>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.status}</Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{new Date(issue.createdAt).toLocaleString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
export default IssuePage
```

### Adding Loading Skeleton
- install: npm i react-loading-skeleton
- ref: https://www.npmjs.com/package/react-loading-skeleton
```tsx
// issues/loading.tsx
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueActions from './_components/IssueActions'
import AppSkeleton from '../components/Skeleton'

const IssueLoadingPage = () => {
  const issues = [1, 2, 3, 4, 5, 6, 7]
  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>CreateAt</Table.ColumnHeaderCell>
          </Table.Row>

        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Link href={`/issues/${issue}`}>
                  <AppSkeleton />
                  <div className='block md:hidden'>
                  <AppSkeleton />
                  </div>
                </Link>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
              <AppSkeleton />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'><AppSkeleton /></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
export default IssueLoadingPage

// components/AppSkeleton.tsx
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AppSkeleton = () => {
  return <Skeleton />
}

export default AppSkeleton
```

### Showing Issue Detail page
- create page.tsx in app/issues/[id] 
```tsx
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  if (typeof parseInt(id) !== 'number') notFound()
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) }
  })
  if (!issue) notFound();
  return (
    <div>
      <Heading as="h1">{issue.title}</Heading>
      <Flex gap="3" my="3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='box'>
      <Text>{issue.description}</Text>
      </Card>
    </div>
  )
}

export default IssueDetailPage

```
- loading.tsx for user friendly interaction
```tsx
import React from 'react'

const LoadingIssueDetailPage = () => {
  return (
    <div>
      Loading...
    </div>
  )
}
export default LoadingIssueDetailPage
```

### Adding Markdown Preview
- install: npm i react-markdown
- by default heading and list unstyled, for this need to install plugins called Typography
- ref: https://github.com/tailwindlabs/tailwindcss-typography
- install: npm install -D @tailwindcss/typography
- Then add the plugin to your tailwind.config.js file:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
```
- and, add prose class to your component

### Building a Styled Link Component
- use Link from radix-ui
- but you will loose client side navigation. it does full page reload
- so create custom components Link in components
```tsx
import React, { ReactNode } from 'react'
import { Link as RadixLink } from '@radix-ui/themes'
import NextLink from 'next/link'

interface Props {
    href: string;
    children: ReactNode;
}

const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} legacyBehavior>
        <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}
export default Link
```
- use above component for Next Link functionality with RadixUI Link looks

### Disable Server Side Rendering
- use dynamic import and desable ssr

```tsx
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"), 
  { ssr: false, loading: () => <Skeleton height="20rem"/> }
)
```


## Updating issue
### Adding Edit button 
```tsx
import { Pencil2Icon, Cross1Icon } from '@radix-ui/react-icons'
...
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap='3'>
      ...
      <Box className='space-x-3'>
        <Link href={`issues/${issue.id}/edit`}>
          <Button variant='outline'>
            <Pencil2Icon />
            Edit Issue
          </Button>
        </Link>
        <Button variant='outline' color='red'>
          <Cross1Icon />
          Delete Issue
        </Button>
      </Box>
    </Grid>
  )
}
export default IssueDetailPage
```

### Applying the Single Responsibiliy Pricinple
- Software entities should have a single responsibility
- 