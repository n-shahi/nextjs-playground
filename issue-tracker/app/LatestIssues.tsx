import prisma from '@/prisma/client'
import { Issue } from '@prisma/client'
import { Text, Card, Table, Flex } from '@radix-ui/themes'
import React from 'react'
import { IssueStatusBadge } from './components'

const LatestIssues = async () => {
  const issues: Issue[] = await prisma.issue.findMany({ take: 5, orderBy: {createdAt: 'asc'} })
  return (
    <Card>
      <Text className='font-medium px-3 mb-5'>Latest Issues:</Text>
      <Table.Root>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex direction='column' gap='3'>
                  {issue.title}
                  <IssueStatusBadge status={issue.status} />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))
          }
        </Table.Body>
      </Table.Root>
    </Card>
  )
}

export default LatestIssues
