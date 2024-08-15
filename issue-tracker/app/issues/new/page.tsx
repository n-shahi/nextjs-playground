'use client'
import { Button, TextField } from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';

import { ErrorMessage, Skeleton, Spinner } from '@/app/components';
import { createIssueSchema } from '@/app/validation_schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import delay from 'delay';

const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"), 
  { ssr: false, loading: () => <Skeleton height="20rem"/> }
)
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = async() => {
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
  await delay(2000)
  return (
    <div>
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
    </div>
  )
}
export default NewIssuePage
