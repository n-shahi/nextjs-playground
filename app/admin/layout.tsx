import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className='flex'>
      <aside className='bg-slate-100 p-5 mr-5 h-dvh'>Admin Sidebar</aside>
      {children}
    </div>
  )
}

export default AdminLayout
