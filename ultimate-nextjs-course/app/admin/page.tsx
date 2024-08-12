'use client'
import React from 'react'
import dynamic from 'next/dynamic'
const HeavyComponent = dynamic(
  () => import('../components/HeavyComponent'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
)

const AdminPage = () => {
  const [isVisible, setVisible] = React.useState(false)
  return (
    <div>
      <p>Admin Home Page</p>
      <button className='btn btn-outline' onClick={() => setVisible(!isVisible)}>Show</button>
      { isVisible && <HeavyComponent />}
    </div>
  )
}

export default AdminPage
