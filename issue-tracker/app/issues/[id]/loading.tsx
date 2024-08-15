import { Skeleton } from '@/app/components'
import { Flex, Card, Box } from '@radix-ui/themes'
import React from 'react'

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-lg'>
      <Skeleton />
      <Flex className="space-x-3" my="3">
        <Skeleton width="5rem"/>
        <Skeleton width='8rem' />
      </Flex>
      <Card className='prose mt-4'>
      <Skeleton count={3}/>
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage
