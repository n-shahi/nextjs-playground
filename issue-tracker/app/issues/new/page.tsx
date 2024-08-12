'use client'
import { Box, Button, TextArea, TextField } from '@radix-ui/themes'

const NewIssuePage = () => {
  return (
    <div>
      <h1>Issue</h1>
      <div className='max-w-xl space-y-3'>
        <TextField.Root placeholder="Title" />
        <TextArea placeholder="Description" />
        <Button>Submit New Issue</Button>
      </div>
    </div>
  )
}

export default NewIssuePage
