'use client'
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import router from 'next/router';
import React from 'react'

const statuses: { label: string, value?: Status }[] = [
    { label: "All" },
    { label: "New", value: Status.NEW },
    { label: "Open", value: Status.OPEN },
    { label: "In Progress", value: Status.IN_PROGRESS },
    { label: "Closed", value: Status.CLOSED },
  ]

const IssueStatusFilter = () => {
  const router = useRouter()
  return (
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
  )
}

export default IssueStatusFilter
