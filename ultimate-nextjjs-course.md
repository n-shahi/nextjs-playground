# The Ultimate NextJS Course

## Getting Started
### Introduction
- Build Fase and Scalable apps with Confidence
- Comprehensive, Easy-to-follow, Organized, Practical and Zero to Hero

- We will gonna build: Beautiful, full-stack, production-grade App 
- Features: 
    - Dashboard, Charts, Sorting, Filtering
    - Pagination, CRUD, Auth, Forms
    - Dialogs, Skeletons, Icons, Caching

- Stacks: NextJS, TypeScript, Taiwind, Radix-UI, Prisma, React-query, React-hooks-form, Zod...

### Prerequisites
- What you should know
    - No prior knowledge of NextJS
    - React
    - TypeScript

### Course Overview
- Paart 1: Theory
  - Functional, 
  - Styling, 
  - Routing and Navigation, 
  - Building APIs,
  - Database Integration with Prisma, 
  - Uploading Files, 
  - Authentication and Authorization, 
  - Sending Emails, 
  - Optimization and Deployment.

- Part 2: Practice
  - Issue Tracker Project

### Source Code: 
- https://github.com/mosh-hamedani/next-course


## NextJS Fundamentals

### Introduction
- What NextJS is
- Creating a NextJS project
- Client and server components
- Data fetching
- Caching
- Static and dynamic rendering

### What is NextJS:
- A framework for building fast and search engines friendly applications
- Its built on the top of React(A library for building interactive UIs)

- A framework= libs + tools + conventions
- NextJs include its own router lib(Next.JS router)

- It comes with compiler: Transform and minify JS code
- CLI: to build and start app 
- Node.js Rutime: Execute JS code

- What is a Node.js runtime? 
    - JS can be run in
        - Web Browser - Client
        - Node.js Runtime - Server
    - Node.js runtime is a server that can run JS code.
    - It allows us to build cool stuffs like
        - build full stack app, so we can write both front-end and back-end code in same next.js project
        - back-end code executes in Node.js Runtime
        - front-end code executes in Web Browser

    - Next.js allow us to render component in server and sent html to frontend: SSR (Server side rendering)
    - With Next we can pre-render certain pages which has static content during app builing and server whenever needed: SSG(Static Site Generation), which is fast


### Setting up Development Environment
- download node.js
- download editor: VS Code etc.
- Install VSCode plugins: ES7 + React/Redux/RN snippets, TypeScript, Tailwind

### Creating Your first Next.js App
- npx create-next-app@13.4
- cd app-name
- npm run dev

### Prject Structure
- app folder: container for routing: File router
- public: storing public assets like images

### Routing and Navigation
- create folder in app: users/page.tsx
  - page should be lowercase as per next convention
- go to /users to check in browser
- other than page will not be public

- create /users/new/page.tsx
- use Link from next/link to avoid rendering as a tag do full page refresh

### Client vs Server Components
- Rendering Environments
    - client: Web browser
    - server: Node.js runtime

- Client-side Rendering: CSR
    - Larger bundles
    - Resource intensive
    - No SEO
    - Less secure

- Server-side Rendering: SSR
    - Smaller bundles
    - Resource efficient
    - SEO
    - More secure

    - Server Components cannot
        - Listen to browser events: click, change, submit..
        - Access browser APIs:local storage
        - Maintain state
        - Use effects
    
    - Real application we often use mixture of both
    - We should default to server components and use client components only when absolute needed

    - move part of components which needs interactivity like buttons
    - all components in app folder are server components by default

    - create components: this is not public unless we add page file
        - create /components/ProductCard.tsx
        - here cant have interactive coponents
        - add 'use client' to make as client componet
    
    - To make our application more search-engine friendly and fast; render in server and render in client when absolute needed

### Data Fetching
- Client: 
    - useState() + useEffect() > ReactQuery

    - large bundles
    - Resource intensive
    - No SEO
    - Less secure
    - Extra roundtrip to server

- Server: 
```tsx
import Link from 'next/link'
import React from 'react'

interface User {
  id: number;
  name: string;
}
const  UsersPage = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store'})
  const users: User[] = await res.json()
  return (
    <div>
      <div>
        <h1>Users Page</h1>
        {users.map((user) =>(
          <div key={user.id}>
            <Link href={`/users/${user.id}`}>
              <p>{user.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
export default UsersPage
```

### Caching
- Fetching in server add another benefit of caching
- Caching: Storing data somewhere that is faster to access

- Data Sources: 
    - Memory
    - File System
    - Network
- Next automatically fetches data from the server and caches it in file system
- We have full control over caching: can be disabled

```tsx
{ cache: 'no-store'} // no caching

{ next: {revalidate: 10}} // will get fresh data every 10 seconds if requested
const res = await fetch('https://jsonplaceholder.typicode.com/users', { next: { revalidate: 10 }})
const users: User[] = await res.json()
```

### Static and Dymanic Rendering
- Static Rendering
    - Render at build time

- Dyanamic Rendering
    - Render at requested time

    - to check: 
        - npm run build; npm start
        - build by adding: { cache: 'no-store' } and removing it from options
    - render type can be seen in build time also. 

### Rendering
- Client
- Server: Static/Dyanamic


## Styling Next.js Application

### Introduction
- Global styles
- CSS modules
- Tailwind CSS
- Daisy UI

### Global Styles:
- /globals.css
    - We should use it for truly global styles like styles for body


### CSS Module
- A CSS file that is scoped to a component/page
- To avoid collisions/override
- create file with same name as componentName.module.css
- can be grouped in to a module for better separation of concern.

```tsx
// ProductCard.tsx
import styles from './ProductCard.module.css';

// ProductCard.module.css
.card {
    padding: 1rem;
    border: 1px solid #ccc;
}
.cardContainer {
    padding: 1rem;
    border: 3px solid #ccc;
}
// - cant be used
// use camel case if needed
```
- we can group tsx and css file in folder

### Tailwind CSS
- Rapidly build modern website without leaving your HTML

- Paddings
    - p-[number]
    - px-[number]
    - py-[number]
    - pt-[number]
    - pr-[number]
    - pb-[number]
    - pl-[number]

- Margins
    - m-[number]
    - mx-[number]
    - my-[number]
    - mt-[number]
    - mr-[number]
    - mb-[number]
    - ml-[number]

- Text
    - Size
        text-sx
        text-sm
        text-base
        text-lg
        text-xl
        text-2xl
        text-3xl
    - Color
        text-[color]
        bg-[color]
        - https://tailwindcss.com/docs/customizing-colors
    
    - Thickness
        - font-thin
        - font-light
        - font-normal
        - font-medium
        - font-bold
    
- apply styles directly into className
```tsx
<div className='p-5 my-5 bg-sky-400 text-white text-xl hover:bg-sky-500'>
    my html content
</div>
```

### DaisyUI
- The Most popular component library for Tailwind CSS
- npm -i -D daisyui@latest
- update tailwind.config.js
```js
module.exports = {
    //...
    plugins: [require('daisyui')],
}
```
- And, use available styles like 
``tsx
<button className='btn btn-outline'>Click</button>
```
- Daisy concept of theme
- ref: https://daisyui.com/docs/themes/ 
- need to follow two steps

- add daisyui theme in tailwind.config.js
```js
module.exports = {
  //...
  daisyui: {
    themes: ["winter"],
  },
}
```
- apply the theme in html
```tsx
// layout.tsx
<html data-theme="cupcake"></html>
```

## Routing and Navigation
- Define dynamic routes
- Access route and query string parameters
- Create layouts
- Show loading UIs
- Hanlde errors

### Routing Overview
- make a folder and add page.tsx file to make url
- if we put some other file in folder, those wont be accessible
- next js looks for special files like
    - page.tsx : to make url public
    - layout.tsx : for defining common layout for page
    - loading.tsx : for loading page/UIs
    - route.tsx : for creating APIs
    - not-found.tsx : for not found error page
    - error.tsx : for showing generic errors pages

### Dynamic routes
- a dynamic route is a route with parameters
- wrap it with square brackets [id]
- create a page.tsx file
```tsx
interface Props {
  params: {id: number;}
}
const UserDetail = ({params: {id}}: Props) => {
  return (
    <div>
      <p>User ID: {id}</p>
    </div>
  )
}
...
```
- if nested then create sub-folders with [differentId] and add differentId key in Props

### Catch all Segments
- if need various parameters like below
- localhost:3000/products/grocery/dairy/milk

- we dont need to create multiple routes/folders
- create folder with [...slug] in required folder and add different strings in slug Props
- wrap it with double square brackets if slig needed to be optional


### Accessing Query String Parameters
- access query string parameters from Props and pass to components if required

```tsx
// Get the query string parameters
import UsersTable from './UserTable'
interface Props {
  searchParams: { sortOrder: 'email' | 'name'}
}

const UsersPage = async ({ searchParams: {sortOrder}}: Props) => {
  return (
    <>
      <h1 className='text-sm pl-3 text-gray-700'>Users Page</h1>
      <p className='text-sm pl-3 text-gray-600'>Sort by: {sortOrder}</p>
      <UsersTable sortOrder={sortOrder} />
    </>
  )
}
export default UsersPage


// Sort by sortOrder
...
import { sort } from 'fast-sort';

interface Props {
  sortOrder: string;
}

const UsersTable = async ({sortOrder}: Props) => {

  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const raw_users: User[] = await res.json()

  const users: User[] = sort(raw_users).asc(
    sortOrder === 'email' ? (user) => user.email : (user) => user.name
  )

  return (
    <>
      <table className='table table-bodered'>
        <thead>
          <tr>
          <th><Link href='/users?sortOrder=name'>Name</Link></th>
            <th><Link href='/users?sortOrder=email'>Email</Link></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
...
```

### Layouts
- to create UI that is shared multiple pages
```tsx

// create layout.tsx in a folder(route)
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className='flex'>
      <aside className='bg-slate-100 p-5 mr-5 h-dvh'>Admin Sidebar</aside>
      {children}
    </div>
  )
}
export default AdminLayout

// create a page.tsx which will show as children in layout.tsx
import React from 'react'

const AdminPage = () => {
  return (
    <div>
      <p>Admin Home Page</p>
    </div>
  )
}
export default AdminPage
```
- Similary Nav can be add in app level layout.tsx, which can be visible from all over the app.

### Navigation
- Link: 
  - It only donwload the content of the target page
  - Pre-fetches links that are in the viewport: prod env only to optimize performance
  - caches pages on the client
- a: It does full page refresh which downloads all content of the page

### Programatic Navigation
- make client side as need user interaction
- import useRouter from 'next/navigation' not from 'next/router'
```tsx
'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const NewUser = () => {
  const router = useRouter()
  return (
    <div>
      <h1 className='text-gray-500 p-5'>New User Page</h1>
      <button className='btn btn-primary' onClick={
        () => {
          console.log('Creating new user...')
          router.push('/users')
        }
      }>Create</button>
    </div>
  )
}
export default NewUser
```

### Showing Loading UIs
- use Suspense react component to show loading indicator
```tsx
<Suspense fallback={<p>Loading...</p>}>
  <UsersTable sortOrder={sortOrder} />
</Suspense>
```

- if you want to show loading in page label then create loading.tsx 
```tsx
import React from 'react'

const LoadingPage = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <span className="loading loading-dots loading-lg"></span>
    </div>
  )
}
export default LoadingPage
```

### Handling Errors
- create non-found.tsx special file to show page if user go to Not exixts page.
- we can create custom not found page based on page. just create non-found.tsx in required folder
- use NotFound from 
```tsx
import React from 'react'

const NotFoundPage = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <span>This Page doesnt exist!</span>
        </div>
    )
}
export default NotFoundPage
```
- programmatically not found error
```tsx
import { notFound } from "next/navigation";

if (id > 10) {
    return notFound()
  }
```

### Handling Unexpected Errors
- create error.tsx special file to show page if any error occurs
- can custom error page in multiple level like not found page
- But, error.tsx in app folder doesnt capture error in main layout.tsx
- to capture error in layout.tsx create global-error.tsx 
- make client page to avoid compilation error
- provide retry button for temporary issues, so that user can retry. but avoid having it all the places
- log error for debugging: use tools like sentry

```tsx
'use client'
interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log('Error: ', error)
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <p>An unexpected error has occurred, please try again.</p>
        <button className='btn btn-outline' onClick={() => reset()}>Try Again</button>
      </div>
    </div>
  )
}
export default ErrorPage
```

## Building APIs
- You will learn
  - Getting objects
  - Creating objects
  - Updating objects
  - Deleting objects
  - Validating requests with Zod

### Getting Collections of Objects
- having api folder is common in case of building APIs
- create sub-folders in api folder like users and add route.tsx file
- we can have either of page.tsx or route.tsx file
- page.tsx for showing markup or html content
- route.tsx for http requests 

- types of requests
  - GET - getting data
  - POST - creating data
  - PUT - updating data

```tsx
//api/users/route.tsx
import { NextRequest, NextResponse } from "next/server";

export async function  GET(request: NextRequest) {
    // return NextResponse.json('Hello World')
    // sleep for 5 seconds
    // await new Promise(resolve => setTimeout(resolve, 5000))
    return NextResponse.json([
        { id: 1, name: 'Nabin Shahi'},
        { id: 2, name: 'Suresh Kumar'},
        { id: 3, name: 'Ramesh Kumar'}
    ])
}
```
- if request is removed from props, data will be cached

### Getting a single object
```tsx
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: number}
}

export async function  GET(request: NextRequest, {params} : Props) {
    // fetch data from db
    if (params.id > 10)
        return NextResponse.json({ error: 'User not found' }, {status: 404})

    return NextResponse.json({ id: params.id, name: 'Nabin Shahi'})
}
```

### Creating an object
- inlude an body object in the request
- post can be test in browser, so use other tools like PostMan, Thunder 
```tsx
export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log('Received POST request:', body);
    if (!body.name)
        return NextResponse.json({ error: 'Name is required' }, {status: 400});

    // save data to db
    return NextResponse.json({ message: 'Data received successfully' }, {status: 201});
}
```

### Updating an Object
- use PUT or PATCH to update the object
- PUT: to replace the object
- PATCH: to update one or more properties of the existing object
```tsx
export async function PUT(request: NextRequest, {params} : Props) {
    // validate the request parameters
    // if invalid, return 400
    // Fetch the user with the given id
    // If user doesn't exist, return 404
    // Update the user
    // Return 200 with updated user data
    const body = await request.json();
    console.log('Received PUT request:', body);
    console.log('Request parameters:', params)

    if (!body.name)
        return NextResponse.json({ error: 'Name field is required.' }, {status: 400});

    if (params.id > 10)
        return NextResponse.json({ error: 'User not found' }, {status: 404})
    return NextResponse.json({ id: 1, name: body.name }, {status: 200});
}
```

### Delete an Object
```tsx
export async function DELETE(request: NextRequest, {params} : Props) {
    // Fetch the user with the given id
    // If user doesn't exist, return 404
    // Delete the user
    // Return 200 with deleted user or just empty object
    const body = await request.json();
    console.log('Received PUT request:', body);
    console.log('Request parameters:', params)

    if (params.id > 10)
        return NextResponse.json({ error: 'User not found' }, {status: 404})

    return NextResponse.json({ id: 1, name: body.name }, {status: 200});
}
```

### Validating Requests with Zod
- better to use validation library like Zod to avoid unnecessary if else to validate the request body
- install Zod library: npm i zod
- create schema, user it to validate in routs.tsx
- use schema.safeParse(body) to avoid Exception if validation failed
```tsx
// users/schema.tsx
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  age: z.integer()
})

export default schema;

// users/[id]/route.tsx
...
import schema from "../schema";

export async function PUT(request: NextRequest, {params} : Props) {
    const body = await request.json();
    console.log('Received PUT request:', body);
    console.log('Request parameters:', params)

    // if (!body.name)
    //     return NextResponse.json({ error: 'Name field is required.' }, {status: 400});

    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json({ error: validation.error.errors }, {status: 400});

    if (params.id > 10)
        return NextResponse.json({ error: 'User not found' }, {status: 404})
    return NextResponse.json({ id: 1, name: body.name }, {status: 200});
}
```


## Database Integration
- Setting up Prisma
- Defining data models
- Creating migrations
- Performing CRUD operations

### Installing MySQL
- There we have many Database Engines: MySQL, PostgreSQL, MongoDB etc...
- download and install MySQL
- Download DataGrip or MySQL Workbench to viewing the database

### Setting up Prisma
- Next-generation NodeJS and TypeScript ORM
- install prisma VSCode extension and install npm dependencies: npm install prisma
- prisma comes with CLI support
- enter 'npx prisma' to see commands
- initialize: npx prisma init
- update schema.prisma: https://www.prisma.io/docs/orm/overview/databases/mysql
- add .env to .gitignore to avoid pushing secrets into repository


### Defining Models
- Models - entities of the database like products, users, categories
- define modesl in prisma.schema
- use Pascal naming convention
```schema.prisma
model User {
  id        Int     @id @default(autoincrement())
  name      String  @unique
  email     String  @unique
  followers Int     @default(0)
  isActive  Boolean @default(false)
}
```
- run `npx prisma format` to format the schema 
- ref: https://www.prisma.io/docs/orm/prisma-schema/data-model/database-mapping


### Creating Migration
- Once we define or change the schema/table we need to create a migration
- run `npx prisma migrate dev` for relational database like mysql/postgres
- run `npx prisma db push` for nosql database like mongodb
- check migrations file in prisma>migrations>...

### Creating a Prisma Client
- create client.ts in prisma folder
```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```
- the above will create multiple instances of prisma so to avoid take ref
- ref: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices


### Getting Data
- FindAll: to get all the users
```tsx
...
import prisma from "@/prisma/client";

export async function  GET(request: NextRequest) {
    const users = await prisma.user.findMany();
    return NextResponse.json(users)
}
```
- FindUnique: to find user
- if not found it will return null
```tsx
...
import prisma from "@/prisma/client";

export async function  GET(request: NextRequest, {params} : Props) {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });
    if (!user)
        return NextResponse.json({ error: 'User not found' }, {status: 404})
    return NextResponse.json(user);
}
```

### Create a new Object
- user create
```tsx
export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success)
        return NextResponse.json({ error: validation.error.errors }, {status: 400});

    const user = await prisma.user.findUnique({ where: { email: body.email } })
    if (user)
        return NextResponse.json({ error: 'User with this email already exists' }, {status: 409});

    // const hashedPassword = await prisma.user.hashPassword({ password: body.password })
    const newUser = await prisma.user.create({
        data: {name: body.name, email: body.email}
    })
    return NextResponse.json(newUser, {status: 201});
}
```

### Updating a User
- use prisma.user.update method to update
```tsx
export async function PUT(request: NextRequest, {params} : Props) {
    const body = await request.json();

    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json({ error: validation.error.errors }, {status: 400});

    const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) } })

    if (!user)
        return NextResponse.json({ error: 'User not found' }, {status: 404})

    const updatedUser = await prisma.user.update({
        where: { id: parseInt(params.id) },
        data: { name: body.name, email: body.email},
    })
    return NextResponse.json(updatedUser, {status: 200});
}
```

### Delete a user 
- user prisma.user.delete() to delete a user
```tsx
export async function DELETE(request: NextRequest, {params} : Props) {
    const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) } })
    if (!user)
        return NextResponse.json({ error: 'User not found' }, {status: 404})

    const deletedUser = await prisma.user.delete({ where: { id: user.id } })
    return NextResponse.json(deletedUser, {status: 200});
}
```

### Prisma Summary
- Setting up Prisma
`npx prisma init`
- Formatting Prisma schema file
`npx prisma format`
- Creating and running a migration
`npx prisma migrate dev`

- Working with Prisma Client
```tsx
await prisma.user. findMany();
await prisma.user. findUnique({ where: { email: 'a' } 7); await prisma.user.create({ data: { name: 'a', email: 'a' } });
await prisma.user.update({ where: { email: 'a' }, data: { email: 'b' } });
```

## Uploading files
- Cloud Platform
  - Amazon S3: part of Amazon Web Services
  - Google Cloud
  - Microsoft Azure
  - Cloudinary: perfect integration with NodeJS

### Setting Cloudinary
- register
- install package: `npm i next-cloudinary`
- create env in cloudinary and update .env accordingly
- ref: https://next.cloudinary.dev/installation
- ref: https://console.cloudinary.com/pm/c-a9880177f162762ae126eecc69db1d/getting-started

## Uploading Files and Showing Uploaded Images
- create presets: setting>Upload>Add upload preset, and use it to upload
- ref: https://next.cloudinary.dev/clduploadwidget/basic-usage
- to check uploaded files: Programmable Media>Media Explorer
```tsx
'use client';
import React from 'react'
import { CldUploadWidget } from 'next-cloudinary';

const UploadPage = () => {
    return (
        <CldUploadWidget uploadPreset="eqemjbxp">
            {({ open }) => {
                return (
                    <button onClick={() => open()}className='btn btn-outline'>
                        Upload an Image
                    </button>
                );
            }}
        </CldUploadWidget>
    )
}
export default UploadPage
```

### Showing the Uploaded Images
```tsx
'use client';

import React, { useState } from 'react'
import { CldUploadWidget, CldImage } from 'next-cloudinary';

interface CloudinaryResultInfo {
    public_id: string;
}

const UploadPage = () => {
    const [publicId, set_publicId] = useState('')
    return (
        <>
        {publicId && <CldImage src={publicId} width={200} height={200} alt='An Image'/>}
        <CldUploadWidget
            uploadPreset="eqemjbxp"
            onSuccess={(result, widget) => {
                if (result.event !== 'success') return
                const info = result.info as CloudinaryResultInfo;
                set_publicId(info.public_id)
            }}
        >
            {({ open }) => {
                return (
                    <button onClick={() => open()} className='btn btn-outline'>
                        Upload an Image
                    </button>
                );
            }}
        </CldUploadWidget>
        </>
    )
}
export default UploadPage
```

### Customize the Upload Widget
- ref: https://demo.cloudinary.com/uw/#/
- customize accordingly and copy params and pass as options to customizeWidget
```tsx
options={{
          multiple: true,
          maxFiles: 2,
          sources: ['local'],
          styles:{
              palette: {
                  window: "#10173a",
                  sourceBg: "#20304b",
                  windowBorder: "#7171D0",
                  tabIcon: "#79F7FF",
                  inactiveTabIcon: "#8E9FBF",
                  menuIcons: "#CCE8FF",
                  link: "#72F1FF",
                  action: "#5333FF",
                  inProgress: "#00ffcc",
                  complete: "#33ff00",
                  error: "#cc3333",
                  textDark: "#000000",
                  textLight: "#ffffff"
              },
          }
      }}
```


## Authentication with Next Auth
- Setting up Next Auth
- Configuring the Google Provider
- Authentication sessions
- Protecting routes
- Databse adapters
- Configuring the Credentials Provider

### Setting Up Next Auth and Configuring Google Provider
- install: npm i next-auth
- ref: https://next-auth.js.org/getting-started/example
- create app in google console and get GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and put in .env
```ts
// api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}
```

### Understanding Sessions on the Client
- check the session in appication/Cookies/your_site
- create token/route.ts
- and analye the token
- jwt: json web token: like an id card, client uses to identify the user
- encoded using base64 algorithm
```ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const token = await getToken({ req: request})
    return NextResponse.json({token: token})
}
```

### Accessing the Session on the Client
- create a provider in app/provider.tsx
```tsx
'use client'
import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

const AuthProvider = ({ children }: { children: ReactNode}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}
export default AuthProvider
```
- wrap body children(app) with AuthProvider
```tsx
import AuthProvider from './auth/Provider'

<AuthProvider>
  <Navbar />
  {children}
</AuthProvider>
```

- get session in Navbar component using useSession
- session.status can be loading, authenticated, or unauthorized
```tsx
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
          { status ==='loading' && <li><div>Loading...</div></li>}
          { status === 'authenticated' && 
          <li>
            {session.user!.name}
            <Link href="/api/auth/signout" className='m-5'>Sign Out</Link>
          </li>}
          { status === 'unauthenticated' && <li><Link href="/api/auth/signin" className='m-5'>Sign In</Link></li>}
        </ul>
      </nav>
    </div>
  )
}
export default Navbar
```

### Accessing Session on the Server
- use getServerSession from next-auth/next, and pass authOptions
- getServerSession will work for both route and page

```tsx
import Image from 'next/image'
import ProductCard from './components/ProductCard'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main>
      <h1>Darsan Dad!</h1>
      { session &&  <h2>Hello {session.user!.name}</h2>}
      <ProductCard />
    </main>
  )
}
```

### Signing Out Users
- just redirect to /api/auth/signout
```tsx
<li>
  {session.user!.name}
  <Link href="/api/auth/signout" className='m-5'>Sign Out</Link>
</li>
```

### Protecting routes
- with the help of middleware, which will execute on every request
```tsx
// import { NextRequest, NextResponse } from "next/server";
// export function middleware(request: NextRequest) {
//     return NextResponse.redirect(new URL('/new-page', request.url ))    
// }
export { default } from 'next-auth/middleware'

export const config = {
    // *: zero or more
    // +: one or more
    // ?: zero or one
    matcher: [
      // '/users/:id*', 
      '/dashboard/'
      ]
}
```
- matcher always starts with /

### Database Adapter
- Upto this point we can login using google
- But in real applications we need to store user information in the database
- These data can have related data like picture, post etc.
- We use adapter to store user information when user is logged in.

- select relevent adapter: for our case prisma
- ref: https://authjs.dev/getting-started/adapters/prisma
- follow ref page to add adapter in authOptions
- add session in authOptions if required(database does not support)
```tsx
session: { strategy: 'jwt'}
```


### Configuring CredentialsProvider
- enable login with username and password
- but here needs fair amount of configuration for registration, login, reset, verfication etc...
- update credentialsProvider in 
```tsx
// api/auth/[...nextauth]/route.tsx
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client"
import bcrypt from "bcrypt"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "email", placeholder: "Email" },
              password: { label: "Password", type: "password", placeholder: "Password"},　
            },
            async authorize(credentials, req ) {
                if (!credentials?.email || !credentials?.password) return null;
                const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                if (!user) return null;
                
                const passwordMatched = await bcrypt.compare(credentials.password, user.hashedPassword!)
                return passwordMatched? user: null;
            },
          }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}
```

### Registering Users
- first need to create an api endpoint
```tsx
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(5),
})

export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = schema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400})
    
    const user = await prisma.user.findUnique({ where: { email: body.email }})
    if (user)
        return NextResponse.json({ message: "User already exists" }, { status: 400 })

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const newUser = await prisma.user.create({
        data: {
            email: body.email,
            hashedPassword: hashedPassword,
        }
    })
    return NextResponse.json({ email: newUser.email, name: newUser.name}, { status: 201 })
}
```

### Additional Reading
- Pages: we can replace the autogenerated login, logout pages with custom ones.
- go to below page for more information
- ref: https://next-auth.js.org/configuration/pages

- Events
- NextAuth.js provides a number of events (eg signIn, signOut, createUser, etc) that are useful for auditing or handling any other side effects:
- ref: https://next-auth.js.org/configuration/events

- We can provide handlers for these events as part of our NextAuth.js setup:
- ref: https://next-auth.js.org/configuration/options#events

### Exercises
Here are a few exercises and challenges for you to tackle. I decided not to show the solutions to push you into the world of problem-solving and active learning. Plus, the solutions would be repetitive and a waste of your time. 1- Configure another OAuth provider, such as GitHub or Twitter. 2- Create a custom registration form that captures user’s name, email, and password. Make sure these values are stored in the database. 3- Create a change password page. Make sure it’s only accessible to logged in users.


## Sending Emails:
### Introduction
- learn how to send email in this section

### Setting Up React Email 
- ref: https://react.email/
- it gives a bunch of components for creating html emails and tool to preview our emails and function to send email
- Manual Setup:
  - npm i react-email @react-email/component
  - update package.json/scripts:  "preview email": "email dev -p 3030"
  - create emails folder in root of app

  - create templates: WelcomeTemplate.tsx
```tsx
import React from 'react'
import { Html, Body, Text, Container, Link, Preview } from '@react-email/components'

const WelcomeTemplate = ({ name }: {name: string}) => {
  return (
    <Html>
        <Preview>Welcome to NextJS</Preview>
        <Body>
            <Container>
                <Text>Hi {name}.</Text>
                <Text>
                    This is a simple example of a NextJS email template.
                </Text>
                <Link href="https://nextjs.org/">Learn More</Link>
            </Container>
        </Body>
    </Html>
  )
}
export default WelcomeTemplate
```

### Previewing Template
- add .react-email/ dir to .gitignore
- run: npm run preview email
- goto web view and test 

### Styling Emails
- inline 
```tsx
 <Text style={{ color: '#333', fontSize: '32px' }}>Hi {name}.</Text>
 ```

 - by separating css into css objects
 ```tsx
 <Text style={}>Hi {name}.</Text>

 const heading: CSSProperties = {
  color: '#333', 
  fontSize: '32px'
 }
 ```

- using Tailwind
```tsx
import React, { CSSProperties } from 'react'
import { Html, Body, Text, Container, Link, Preview, Tailwind } from '@react-email/components'

const WelcomeTemplate = ({ name }: {name: string}) => {
  return (
    <Html>
        <Preview>Welcome to NextJS</Preview>
        <Body style={{background: '#fff'}}>
           <Tailwind>
            <Container>
                <Text className="font-bold text-3xl">Hi {name}.</Text>
                <Text>
                    This is a simple example of a NextJS email template.
                </Text>
                <Link href="https://nextjs.org/">Learn More</Link>
            </Container>
           </Tailwind>
        </Body>
    </Html>
  )
}
export default WelcomeTemplate
```

### Sending Emails
- ref: https://react.email/docs/integrations/resend
- register and create API token
- register your domain to make sure your sending email is authorized
```tsx
import { Resend } from 'resend';
import WelcomeTemplate from "@/emails/WelcomeTemplate";
import { NextResponse } from 'next/server';

const resend = new Resend('re_123456789');

export async function POST() {
  await resend.emails.send({
    from: 'you@example.com',
    to: 'user@gmail.com',
    subject: 'hello world',
    react: <WelcomeTemplate name="Nabin Shahi" />,
  })
  return NextResponse.json({'status': true}, { status: 200})
}
```

## Optimization 
- You will learn
  - Optimizing images
  - Using third party JS libraries
  - Using custom fonts
  - Search Engine Optimization
  - Lazy loading

### Optimizing Images
- We can optimize images in NextJS using Image components
- which is built on the top of html image tag, but undert the hood it automatically compresses and resizes according to devices.
- it serves images as webp(modern format which supports in all browsers and far smaller)

- ref: https://nextjs.org/docs/pages/building-your-application/optimizing/images
- Static: imges which ships to the application, images in public folder
- Remote: 
  - add remote to nextConfig for security reasons cuz
  - for remote images need to specify height and width of the images
  - specify height and width if need to display fixed size of the image
  - if responsive: use fill instead of height and width
  - set style={{ objectFit: 'cover or contain' }}
  - or set className='object-cover'
  - we often need to set sizes with fill: 
    - for 100% width of the viewport: sizes="100vw"
    - for showing multiple columns: sizes="(max-width: 480px) 100vw, (max-width: 768px) 33">
    - the above sizes is only for NextJS to properly optimize images
  - set quality={100} for the highest quality for images like backgrounds, but 75 works for most cases
  - set priority if you want to get in first go(ignoring lazy loading)
  - when we use fill props, we need to set position clasName="relative or absolute or fixed" and height clasName="h-screen"
```tsx
import Image from "next/image"
import coffee from "@/public/images/coffee.jpg"

export default async function Home() {
  return (
    <main>
      <Image src={cofee} alt="Cofee" />
      <Image 
        src="https://bit.ly/react-cover" 
        alt="Cofee"
        height={170}
        width={300}
      />
    </main>
  )
}
```