import React from 'react'
import UsersTable from './UserTable'

const UsersPage = async () => {
  return (
    <>
      <h1 className='text-sm pl-3 text-gray-700'>Users Page</h1>
      <UsersTable />
    </>
  )
}

export default UsersPage
