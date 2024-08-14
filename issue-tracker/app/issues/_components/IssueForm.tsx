'use client'
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import ErrorMessage from '@/app/components/ErrorMessage';
import { zodResolver }  from '@hookform/resolvers/zod'
import { z } from 'zod';
import { createIssueSchema } from '@/app/validation_schema';

type IssueForm = z.infer<typeof createIssueSchema>;

const IssueForm = () => {
  const { register, handleSubmit, control, formState: {errors}} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const router = useRouter()
  console.log(errors)
  return (
    <div className='max-w-3xl space-y-3'>
      <form
        className='max-w-3xl space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues')
          } catch (error) {
            console.error(error)
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register('title')} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button className=''>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default IssueForm
