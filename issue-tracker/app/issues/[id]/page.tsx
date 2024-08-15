import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from '../EditIssueButton'
import DeleteIssueButton from '../DeleteIssueButton'
import IssueDetails from '../IssueDetails'

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
        <IssueDetails issue={issue} />
      </Box>
      <Box className='space-x-3'>
        <EditIssueButton issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id}/>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
