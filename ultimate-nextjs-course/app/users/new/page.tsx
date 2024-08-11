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
