'use client'
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div>
      <h1>Issue</h1>
      <div className='max-w-xl space-y-3'>
        <TextField.Root placeholder="Title" />
        {/* <TextArea placeholder="Description" /> */}
        <SimpleMDE />
        <Button>Submit New Issue</Button>
      </div>
    </div>
  )
}
export default NewIssuePage
