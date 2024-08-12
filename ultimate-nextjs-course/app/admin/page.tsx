'use client'
import React from 'react'
import _ from 'lodash';

const AdminPage = () => {
  return (
    <div>
      <p>Admin Home Page</p>
      <button className='btn btn-outline' onClick={ async() => {
        const _ = (await import('lodash')).default
        const users = [
          { id: 1, name: 'John Doe' },
          { id: 3, name: 'Mike Doe' },
          { id: 2, name: 'Jane Doe' },
        ]
        const sortedUsers = _.orderBy(users, ['name'])
        console.log(sortedUsers)
      }}>Show</button>
    </div>
  )
}

export default AdminPage
