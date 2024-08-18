import { IssueStatusBadge } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

export interface IssueQuery {
    status: Status,
    orderBy: keyof Issue,
    page: string
}

interface Props {
  searchParams: IssueQuery,
  issues: Issue[]
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell key={column.value} className={column.className}>
              <Link href={{
                query: { ...searchParams, orderBy: column.value }
              }}>{column.label}</Link>
              {column.value === searchParams.orderBy && <ArrowUpIcon className='inline' />}
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
  )
}

const columns: { label: string; value: keyof Issue; className: string }[] = [
  { label: 'Issue', value: 'title', className: '' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Create At', value: 'createdAt', className: 'hidden md:table-cell' },
]

export const columnName = columns.map(column => column.value)

export default IssueTable
