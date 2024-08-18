import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from '../EditIssueButton'
import DeleteIssueButton from '../DeleteIssueButton'
import IssueDetails from '../IssueDetails'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/utils/authOptions'
import AssignIssue from '../_components/AssignIssue'
import { Metadata } from 'next'

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  if (typeof parseInt(id) !== 'number') notFound()
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) }
  })
  if (!issue) notFound();
  const session = await getServerSession(authOptions)
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap='3'>
      <Box className='md:col-span-4 md:'>
        <IssueDetails issue={issue} />
      </Box>

      {session && <Box>
        <Flex direction='column' gap='2'>
          <AssignIssue issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>}
    </Grid>
  )
}

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })
  return {
    title: `Issue: ${issue!.id} - ${issue!.title}`,
    description: `Description of the issue: ${issue!.title}`,
  }
}

export default IssueDetailPage
