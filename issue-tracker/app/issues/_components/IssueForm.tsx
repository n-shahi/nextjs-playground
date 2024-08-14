'use client'
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import ErrorMessage from '@/app/components/ErrorMessage';

interface IssueForm {
  title: string;
  description: string;
}

const IssueForm = () => {
  const { register, handleSubmit, control} = useForm<IssueForm>();
  const [error, setError] = useState('');
  const router = useRouter()
  return (
    <div className='max-w-3xl space-y-3'>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form
        className='max-w-3xl space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            setError('')
            await axios.post('/api/issues', data);
            router.push('/issues')
          } catch (error) {
            setError('Unexpected error occurred.')
            console.error(error)
          }
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

export default IssueForm
