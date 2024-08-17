"use client"
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Skeleton } from "@/app/components"

const AssignIssue = ({issue}: {issue: Issue}) => {
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => axios.get('/api/users').then(res => res.data),
        staleTime: 1000 * 60 * 1, // 1 minutes // default 0
        retry: 3 
    });
    if (isLoading) return <Skeleton />
    if (error) return null;
    return (
        <Select.Root defaultValue={issue?.assignToUserId || 'unassigned'} onValueChange={(userId) => {
            if (userId === 'unassigned') userId = '';
            axios.patch('/api/issues/' + issue.id, { assignToUserId: userId || null })
        }}>
            <Select.Trigger placeholder='Assign to...'/>
            <Select.Content>
                <Select.Group>
                    <Select.Item value='unassigned'>UnAssigned</Select.Item>
                    <Select.Label>Suggestions</Select.Label>
                    { users?.map((user) => (
                         <Select.Item key={user.id} value={user.id}>{user.email}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}
export default AssignIssue
