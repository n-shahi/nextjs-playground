'use client'
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams()
  return (
    <Select.Root 
      defaultValue={searchParams.get("status") || "all"} 
      onValueChange={(status) => {
        if (status === 'all') status = ''

        const params = new URLSearchParams()
        if (status) params.set('status', status)
        if (searchParams.get('orderBy'))
          params.set('orderBy', searchParams.get('orderBy')!)
        
        const query = params? `?${params.toString()}` : ''
        router.push(`/issues/list${query}`)
      }}>
        <Select.Trigger placeholder="Filter by status"/>

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
