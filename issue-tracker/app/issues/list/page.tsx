import prisma from '@/prisma/client'
import { Box, Table } from '@radix-ui/themes'
import IssueActions from '../_components/IssueActions'
import { IssueStatusBadge } from '@/app/components'
import Link from 'next/link'
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons'

interface Props {
  searchParams: { status: Status, orderBy: 'title' | 'status' | 'createdAt'};
}

const IssuePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  const columns: { label: string; value: keyof Issue; className: string }[] = [
    { label: 'Issue', value: 'title', className: '' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Create At', value: 'createdAt', className: 'hidden md:table-cell' },
  ]
  const orderBy = columns.map(column => column.value).includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined
  const issues = await prisma.issue.findMany({ 
    where: { status },
    orderBy: orderBy
  })

  return (
    <Box>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <Link href={{
                  query: {...searchParams, orderBy: column.value}
                }}>{column.label}</Link>
                { column.value === searchParams.orderBy && <ArrowUpIcon className='inline'/>}
              </Table.ColumnHeaderCell>
            ))}
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
