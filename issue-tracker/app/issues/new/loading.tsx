import { Skeleton } from '@/app/components';
import { Box } from '@radix-ui/themes';

const IssueLoadingPage = () => {
  return (
    <Box className='max-w-3xl'>
      <Skeleton />
      <Skeleton height="20rem"/>
    </Box>
  )
}

export default IssueLoadingPage
