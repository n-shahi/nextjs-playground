'use client'
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import ErrorMessage from '@/app/components/ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import { createIssueSchema } from '@/app/validation_schema';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

const IssueForm = () => {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const router = useRouter()
  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues')
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <div className='max-w-3xl space-y-3'>
      <form
        className='max-w-3xl space-y-3'
        onSubmit={onSubmit}
      >
        <TextField.Root placeholder="Title" {...register('title')} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  )
}

export default IssueForm
