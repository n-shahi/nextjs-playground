import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  if (typeof parseInt(id) !== 'number') notFound()
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) }
  })
  if (!issue) notFound();
  return (
    <Box className='max-w-lg'>
      <Heading as="h1">{issue.title}</Heading>
      <Flex className="space-x-3" my="3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose mt-4'>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </Box>
  )
}

export default IssueDetailPage
