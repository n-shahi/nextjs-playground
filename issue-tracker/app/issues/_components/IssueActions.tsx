'use client'
import { Status } from '@prisma/client'
import { Button, Flex, Select } from '@radix-ui/themes'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const statuses: { label: string, value?: Status }[] = [
  { label: "All" },
  { label: "New", value: Status.NEW },
  { label: "Open", value: Status.OPEN },
  { label: "In Progress", value: Status.IN_PROGRESS },
  { label: "Closed", value: Status.CLOSED },
]

const IssueActions = () => {
  const router = useRouter()
  return (
    <Flex mb='5' justify='between'>
      <Select.Root onValueChange={(status) => {
        if (status === 'all') status = ''
        const query = status ? `?status=${status}` : '';
        router.push(`/issues/list/${query}`)
      }}>
        <Select.Trigger placeholder="Filter by status" />

        <Select.Content>
          {statuses.map(stat => (
            <Select.Item key={stat.value} value={stat.value || 'all'}>
              {stat.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Button><Link href='/issues/new'>New Issue</Link></Button>
    </Flex>
  )
}

export default IssueActions
