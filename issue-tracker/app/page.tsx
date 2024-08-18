import Image from 'next/image'
import NavBar from './NavBar'
import Pagination from './components/Pagination'
import LatestIssues from './LatestIssues'
import IssuesSummary from './IssuesSummary'
import prisma from '@/prisma/client'
import SummaryChart from './SummaryChart'
import { Flex, Grid } from '@radix-ui/themes'

export default async function Home({ searchParams }: { searchParams: { page: string } }) {
  const open = await prisma.issue.count({ where: { status: "OPEN" } })
  const inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } })
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } })
  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssuesSummary open={open} inProgress={inProgress} closed={closed} />
        <SummaryChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}
