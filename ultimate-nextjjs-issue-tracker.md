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
- split up components to make it modular 
- put path related components into _component folder which does not include in paths even though we put page.tsx

### Building the Edit Page
- reuse IssueForm and add functionality to take issue to pre-populate value if issue is passed

### Buiding an API
- create [id]/route.tsx to create PATCH requests

```tsx
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validation_schema";

export async function PATCH(request: NextRequest, {params: {id}}: { params: {id: string}}) {
    const data = await request.json();

    const validation = issueSchema.safeParse(data)
    if (!validation.success)
        return NextResponse.json({ error: validation.error.format() }, { status: 400 })

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    })
    if (!issue)
        return NextResponse.json({ error: 'Issue not found' }, { status: 404 })

    const updatedIssue = await prisma.issue.update({
        where: { id: parseInt(id) },
        data: {
            title: data.title || issue.title,
            description: data.description || issue.description,
        }
    })
    return NextResponse.json(updatedIssue, { status: 200 })

}
```

### Update Issue
- do patch is issue is present else post
```tsx
try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post('/api/issues', data);
      }
      router.push('/issues')
    } catch (error) {
      console.error(error)
    }
```

### Understanding Caching in NextJS
- In nextJs we have three cache layers
    - Data Cache
      - When we fetch data using fetch()
        - so whenever we fetch data using fetch() api, next time it will fetch from cache. 
        - Stored in the file system
        - Permanent until we redeploy our application
        - to disable: fetch('', {cache: 'no-store'})
        - or time based revalidation: fetch('', {next: { revalidate: 60}})
        - it doesn't apply for other than fetch api like axios
    
    - Full Route Cache(Cache on the Server)
      - Used to store the output of statically rendered routes
      - in nextJs the path which doesnt have params considered as static route
      - to disable: export const dynamic = 'force-dynamic'
      - to disable: export const revalidate = 0; // revalidate every seconds
      - ref: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
    
    - Router Cache(Client side cache)
      - to store the payload of pages in browser
      - lasts for a session
      - Gets refreshed when we reload
      - pages stored in client side get automatic revalidation: 
        - 5 Mins for static routes
        - 30 Seconds for dynamic routes
      - to force revalidate: router.refresh();
  
### Removing Duplicate Skeleton
- remove nested path to avoid skeleton collisions


## Authentication
### Setting Up NextAuth
- goto part1: ## Authentication with Next Auth

### Fox for 403 for image 
- add referrerPolicy='no-referer' in Avatar
- else: update next.config.js>nextConfig object
```tsx
const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*', // all endpoint of app
                headers: [
                    { key: 'referrer-policy', value: 'no-referrer' },
                ],
            },
        ]
    }
}
```

### Securing the Application
- prevent annoneous users to prevent to create, delete issues
- middleware: a function that get executed for every request
  - if not authenticated redirect the user to login page
- create middleware.ts in root folder
```tsx
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    "/issues/new",
    "/issues/edit/:id+",
  ]
}
```
- hide actions belong to users like edit or delete buttons
```tsx
...
  const session = await getServerSession(authOptions)
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap='3'>
      <Box className='md:col-span-4 md:'>
        <IssueDetails issue={issue} />
      </Box>

      {session && <Box>
        <Flex direction='column' gap='2'>
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>}
    </Grid>
  )
}
export default IssueDetailPage
```
- protect api endpoint by adding check like below
```tsx
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";

const session = await getServerSession(authOptions)
if (!session)
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
```


## Assigning Issues to Users
### Building the Assignee Select Component
- use Select component from radix UI to create issues/_component/AssignIssue.tsx and use in issues page
- ref: https://www.radix-ui.com/themes/docs/components/select
- fetch user directly from client component(above: it's client component as it needs user interaction)
```tsx
"use client"
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AssignIssue = () => {
    const [ users, setUsers ] = useState<User[]>([])
    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await axios.get('/api/users/')
            setUsers(data)
        }
        fetchUsers()
    }, [])
    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign to...'/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    { users.map((user) => (
                         <Select.Item key={user.id} value={user.id}>{user.email}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}
export default AssignIssue

```

- add GET users api to api/users/route.ts
- include request: NextRequest to avoid caching
```ts
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany(
        { orderBy: { name: 'asc'}}
    )
    return NextResponse.json(users, { status: 200});
}
```

### Setting Up React Query
- we can simply use fetch or axios to fetch data from api
- but as need to hanlde error, retry and caching(no need to fetch data based on issue like users) is required
- to handle all above issue we can use TanStack Query instead
  
- npm i @tanstack/react-query@4.35.3
- create app/QueryClientProvider.tsx so that we can wrap all body elements with it and share QueryClient across component tree. 
- react context is only available in client side to add "use client"
```tsx
"use client"
import React, { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
        {children}
    </ReactQueryClientProvider>
  )
}
export default QueryClientProvider
```

### Fetch Data Using React Query
```tsx
"use client"
...
const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => axios.get('/api/users').then(res => res.data),
    staleTime: 1000 * 60 * 1, // 1 minutes // default 0
    retry: 3 
});
if (isLoading) return <Skeleton />
if (error) return null;
...
```
### Update Issue PATCH API to handle assignToUserId
- issues/[id]/route.tsx
```tsx
export async function PATCH(request: NextRequest, {params: {id}}: { params: {id: string}}) {
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const data = await request.json();

    const validation = patchIssueSchema.safeParse(data)
    if (!validation.success)
        return NextResponse.json({ error: validation.error.format() }, { status: 400 })
    
    const { assignToUserId, title, description } = data;
    if (assignToUserId) {
        const assignUser = await prisma.user.findUnique({where: { id: assignToUserId }})
        if (!assignUser) return NextResponse.json({ error: 'Invalid user' }, { status: 404 })
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    })
    if (!issue)
        return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
    const updatedIssue = await prisma.issue.update({
        where: { id: parseInt(id) },
        data: {
            title: title || issue.title,
            description: description || issue.description,
            assignToUserId: assignToUserId || issue.assignToUserId,
        }
    })
    return NextResponse.json(updatedIssue, { status: 200 })
}
```

- Also create separate schema for patch
```ts
})
export const patchIssueSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255, "Title can't be more than 255 characters").optional(),
    description: z.string().min(1, 'Description is required.').max(65535).optional(),
    assignedToUserId: z.string().min(1, 'AssignedToUserId is required').max(255).optional().nullable(),
})
```

### Showing Toast Notifications
- npm install react-hot-toast
- ref: https://www.npmjs.com/package/react-hot-toast


## Filtering, Sorting and Pagination
### Filtering and Sorting
- update url query in componets and get those in list page and use it to fetch data using prisma
```tsx
/// issue-tracker/app/issues/_components/IssueStatusFilter.tsx
'use client'
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import router from 'next/router';
import React from 'react'

const statuses: { label: string, value?: Status }[] = [
    { label: "All" },
    { label: "New", value: Status.NEW },
    { label: "Open", value: Status.OPEN },
    { label: "In Progress", value: Status.IN_PROGRESS },
    { label: "Closed", value: Status.CLOSED },
  ]

const IssueStatusFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  return (
    <Select.Root 
      defaultValue={searchParams.get("status") || "all"} 
      onValueChange={(status) => {
        if (status === 'all') status = ''

        const params = new URLSearchParams()
        if (status) params.set('status', status)
        if (searchParams.get('orderBy'))
          params.set('orderBy', searchParams.get('orderBy')!)
        
        const query = params? `?${params.toString()}` : ''
        router.push(`/issues/list${query}`)
      }}>
        <Select.Trigger placeholder="Filter by status"/>

        <Select.Content>
          {statuses.map(stat => (
            <Select.Item key={stat.value} value={stat.value || 'all'}>
              {stat.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
  )
}
export default IssueStatusFilter


// issue-tracker/app/issues/list/page.tsx
import prisma from '@/prisma/client'
import { Box, Table } from '@radix-ui/themes'
import IssueActions from '../_components/IssueActions'
import { IssueStatusBadge } from '@/app/components'
import Link from 'next/link'
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons'

interface Props {
  searchParams: { status: Status, orderBy: 'title' | 'status' | 'createdAt'};
}

const IssuePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  const columns: { label: string; value: keyof Issue; className: string }[] = [
    { label: 'Issue', value: 'title', className: '' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Create At', value: 'createdAt', className: 'hidden md:table-cell' },
  ]
  const orderBy = columns.map(column => column.value).includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined
  const issues = await prisma.issue.findMany({ 
    where: { status },
    orderBy: orderBy
  })

  return (
    <Box>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <Link href={{
                  query: {...searchParams, orderBy: column.value}
                }}>{column.label}</Link>
                { column.value === searchParams.orderBy && <ArrowUpIcon className='inline'/>}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>

        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                  <div className='block md:hidden'>
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Link>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{new Date(issue.createdAt).toLocaleString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Box>
        <p>Total Issues: {issues.length}</p>
      </Box>
    </Box>
  )
}
export const dynamic = 'force-dynamic'
export default IssuePage
```
### Pagination
- build pagination component and set query parameters based on click events
- and fetch data according to the query parameters

## Dashboard
- build component LatestIssues.tsx, IssuesSummary.tsx, SummaryChart.tsx
- use recharts for chart


## Going to Production
### Adding Metadata
- add metadata with openGraph 
```tsx
export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'A simple issue tracker application built with Next.js and Prisma.',
  openGraph: {
    type: 'website',
    url: 'https://example.com',
    title: 'Issue Tracker',
    description: 'A simple issue tracker application built with Next.js and Prisma.',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 800,
        height: 600,
      },
    ],
  },
}
```
- Add metadata dynamically
```tsx
  export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })
  return {
    title: `Issue: ${issue!.id} - ${issue!.title}`,
    description: `Description of the issue: ${issue!.title}`,
  }
}
```

- simple metadata
```tsx
export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View All Project Issue'
}
```

### Optimizing Performance using React Cache
- use cache from reach to cache result and use it in many places
```tsx
const fetchIssue = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }))
```
- add config object like below to see each query made 
```tsx
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query']
  })
}
```

### Remove/Include .env variables
- add .env.example for refrence in the repo without sensetive info but not the real one. 
- if any sensitive files commited, remove using git-filter-repo
- ref: https://github.com/newren/git-filter-repo
- download git-filter-repo and change extension to .py and run below command
- python3 git-filter-repo --path .env --invert-paths --force