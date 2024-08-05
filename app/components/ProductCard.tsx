import React from 'react'
import Button from './Button'
import styles from './ProductCard.module.css'

const ProductCard = () => {
  return (
    <div className={styles.card}>
      <Button>Product Card</Button>
    </div>
  )
}

export default ProductCard
