import Link from 'next/link'
import React from 'react'

interface User {
  id: number;
  name: string;
}

const  UsersPage = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
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
