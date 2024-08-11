import React from 'react'
import { sort } from 'fast-sort';
import Link from 'next/link';


interface User {
  id: number;
  name: string;
  email: string;
}


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

export default UsersTable
