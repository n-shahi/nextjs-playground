import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}
const IssuesSummary = ({open, inProgress, closed}: Props) => {
  const data = [
    {label: 'Open Issues', value: open, 'status': 'OPEN'},
    {label: 'In Progress Issues', value: inProgress, 'status': 'IN_PROGRESS'},
    {label: 'Closed Issues', value: closed, 'status': 'CLOSED'},
  ]
  return (
    <Flex gap='3'>
        { data.map(({ label, value, status }) =>(
          <Card key={label} className='w-1/3'>
              <Flex direction='column' gap='3'>
                <Link href={{
                  pathname: '/issues/list',
                  query: { status }
                }}><Text className='font-medium'>{label}</Text></Link>
                <Text className='font-medium'>{value}</Text>
            </Flex>
          </Card>
        ))}
    </Flex>
  )
}

export default IssuesSummary
