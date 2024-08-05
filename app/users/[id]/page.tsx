'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const UserDetail = () => {
  const userId = useParams()
  return (
    <div>
      <h1>User Detail</h1>
      <p>User ID: {userId.id}</p>
    </div>
  )
}

export default UserDetail
