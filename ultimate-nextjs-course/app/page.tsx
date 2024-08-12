import Image from 'next/image'
import ProductCard from './components/ProductCard'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'
import hiking from "@/public/images/hiking.png" 

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main className='relative h-screen'>
      {/* <h1>Darsan Dad!</h1>
      { session &&  <h2>Hello {session.user!.name}</h2>}
      <ProductCard /> */}
    </main>
  )
}
