import React from 'react'

interface Props {
  params: { id: number; photoId: number}
}

const PhotoDetailPage = ({params: { id, photoId }}: Props) => {
  return (
    <div>
      <h1>Photo Detail</h1>
      <p>Photo ID: {id}</p>
      <p>Photo sub id : {photoId}</p>
    </div>
  )
}

export default PhotoDetailPage
