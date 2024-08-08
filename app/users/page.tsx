import React, { Suspense } from 'react'
import UsersTable from './UserTable'
import Link from 'next/link'

interface Props {
  searchParams: { sortOrder: 'email' | 'name'}
}

const UsersPage = async ({ searchParams: {sortOrder}}: Props) => {
  return (
    <>
      <h1 className='pl-3 text-gray-700'>Users Page</h1>
      <Link href='/users/new'><button className='btn'>New User</button></Link>
      <br />
      <p className='text-sm pl-3 text-gray-600'>Sort by: {sortOrder}</p>
      <Suspense fallback={<p>Loading...</p>}>
        <UsersTable sortOrder={sortOrder} />
      </Suspense>
    </>
  )
}

export default UsersPage
