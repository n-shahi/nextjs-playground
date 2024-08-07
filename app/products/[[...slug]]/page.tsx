import React from 'react'

interface Props {
    params: { slug: string[]}
}

const ProductPage = ({params: {slug}}: Props) => {
  return (
    <div>
      <p>Product Page: {slug}</p>
    </div>
  )
}

export default ProductPage