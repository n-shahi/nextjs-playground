import React from 'react'
import UsersTable from './UserTable'

interface Props {
  searchParams: { sortOrder: 'email' | 'name'}
}

const UsersPage = async ({ searchParams: {sortOrder}}: Props) => {
  return (
    <>
      <h1 className='pl-3 text-gray-700'>Users Page</h1>
      <p className='text-sm pl-3 text-gray-600'>Sort by: {sortOrder}</p>
      <UsersTable sortOrder={sortOrder} />
    </>
  )
}

export default UsersPage
