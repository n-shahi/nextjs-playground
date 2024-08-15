import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueActions from './_components/IssueActions'
import { Skeleton } from '@/app/components'

const IssueLoadingPage = () => {
  const issues = [1, 2, 3, 4, 5, 6, 7]
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
            <Table.Row key={issue}>
              <Table.Cell>
                <Link href={`/issues/${issue}`}>
                  <Skeleton />
                  <div className='block md:hidden'>
                    <Skeleton />
                  </div>
                </Link>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <Skeleton />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssueLoadingPage
