'use client'
import React from 'react'

interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button onClick={()=> console.log('Hi There')}>
      {children}
    </button>
  )
}

export default Button