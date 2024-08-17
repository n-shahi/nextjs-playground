import prisma from '@/prisma/client'
import { Box, Grid, Table } from '@radix-ui/themes'
import IssueActions from '../_components/IssueActions'
import { Link, IssueStatusBadge } from '@/app/components'
import { Status } from '@prisma/client';

interface Props {
  searchParams: { status: Status};
}

const IssuePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  const issues = await prisma.issue.findMany({where: {status}})
  return (
    <Box>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>CreateAt</Table.ColumnHeaderCell>
          </Table.Row>

        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                  <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                  </div>
                </Link>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{new Date(issue.createdAt).toLocaleString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Box>
        <p>Total Issues: {issues.length}</p>
      </Box>
    </Box>
  )
}

export const dynamic = 'force-dynamic'

export default IssuePage
