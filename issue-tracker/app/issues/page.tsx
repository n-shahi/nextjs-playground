import prisma from '@/prisma/client'
import { Badge, Button, Flex, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusBadge from '../components/IssueStatusBadge'
import delay from 'delay'
import IssueActions from './_components/IssueActions'

const IssuePage = async () => {
  const issues = await prisma.issue.findMany()
  await delay(3000)
  return (
    <div>
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
    </div>
  )
}

export default IssuePage
