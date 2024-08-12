'use client'
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { useRouter } from 'next/navigation';
import axios from 'axios';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, handleSubmit, control } = useForm<IssueForm>();
  const router = useRouter()
  return (
    <div>
      <h1>Issue</h1>
      <form
        className='max-w-3xl space-y-3'
        onSubmit={handleSubmit(async (data) => {
          await axios.post('/api/issues', data);
          router.push('/issues')
        })}
      >
        <TextField.Root placeholder="Title" {...register('title')} />
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        <Button className=''>Submit New Issue</Button>
      </form>
    </div>
  )
}
export default NewIssuePage
