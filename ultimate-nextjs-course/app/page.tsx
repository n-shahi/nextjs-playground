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
      {/* <Image src={hiking} alt='Hiking'/> */}
      <Image 
        src="https://bit.ly/react-cover" 
        alt="Coffee"
        // height={300}
        // width={300}
        // style={{ objectFit: 'cover' }}
        className='object-cover'
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 33"
        fill
        priority
        quality={10}
      />
    </main>
  )
}
