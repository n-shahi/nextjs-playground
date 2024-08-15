import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { IssueStatusBadge } from '../components'
import { Issue } from '@prisma/client'

const IssueDetails = ({issue}: {issue: Issue}) => {
  return (
    <>
      <Heading as="h1">{issue.title}</Heading>
        <Flex className="space-x-3" my="3">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose mt-4'>
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
    </>
  )
}

export default IssueDetails
