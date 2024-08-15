import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Pencil2Icon, Cross1Icon } from '@radix-ui/react-icons'

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
    <Grid columns={{ initial: "1", md: "2" }} gap='3'>
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
      <Box className='space-x-3'>
        <Link href={`issues/${issue.id}/edit`}>
          <Button variant='outline'>
            <Pencil2Icon />
            Edit Issue
          </Button>
        </Link>
        <Button variant='outline' color='red'>
          <Cross1Icon />
          Delete Issue
        </Button>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
