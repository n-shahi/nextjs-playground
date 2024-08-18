import prisma from '@/prisma/client'
import { Box, Flex } from '@radix-ui/themes'
import IssueActions from '../_components/IssueActions'
import { Issue, Status } from '@prisma/client';
import Pagination from '@/app/components/Pagination'
import IssueTable, { columnName, IssueQuery } from '../_components/IssueTable';
import { Metadata } from 'next';

interface Props {
  searchParams: IssueQuery
}

const IssuePage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  const where = { status }

  const orderBy = columnName.includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined

  const issues: Issue[] = await prisma.issue.findMany({
    where,
    orderBy: orderBy,
    take: pageSize,
    skip: (page - 1) * pageSize,
  })
  const totalIssue = await prisma.issue.count({ where });

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Box><p>Total Issues: {totalIssue}</p></Box>
      <Pagination itemCount={totalIssue} pageSize={pageSize} currentPage={page} />
    </Flex>
  )
}
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View All Project Issue'
}

export default IssuePage
