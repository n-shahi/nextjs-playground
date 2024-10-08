'use client'
import { Button, TextField } from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';

import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from '@/app/validation_schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor';

type IssueForm = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema)
  });
  const router = useRouter()
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post('/api/issues', data);
      }
      router.push('/issues/list')
      router.refresh();
    } catch (error) {
      console.error(error)
    }
  })
  return (
    <div>
      <div className='max-w-3xl space-y-3'>
        <form
          className='max-w-3xl space-y-3'
          onSubmit={onSubmit}
        >
          <TextField.Root placeholder="Title" {...register('title')} defaultValue={issue?.title} />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
            name='description'
            control={control}
            defaultValue={issue?.description}
            render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
          <Button disabled={isSubmitting}>
            {issue ? 'Update Issue' : 'Submit New Issue'} {isSubmitting && <Spinner />}
          </Button>
        </form>
      </div>
    </div>
  )
}
export default IssueForm
