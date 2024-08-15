import AppSkeleton from '@/app/components/Skeleton'

const IssueLoadingPage = () => {
  return (
    <div className='max-w-3xl space-y-3'>
      <AppSkeleton />
      <AppSkeleton />
      <AppSkeleton />
    </div>
  )
}

export default IssueLoadingPage
