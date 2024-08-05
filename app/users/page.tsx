import Link from 'next/link'
import React from 'react'

const UsersPage = () => {
  return (
    <div>
      <div>
        <h1>Users Page</h1>
        <a href="/users/new">New User</a>
        <br /><br />
        <Link href='/users/new'>New User</Link>
      </div>
    </div>
  )
}

export default UsersPage
