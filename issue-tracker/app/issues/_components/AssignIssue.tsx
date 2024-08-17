"use client"
import { Skeleton } from "@/app/components"
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const AssignIssue = ({ issue }: { issue: Issue }) => {
    const { data: users, error, isLoading } = useUsers()
    if (isLoading) return <Skeleton />
    if (error) return null;
    
    const assignIssue = (userId: string) => {
        if (userId === 'unassigned') userId = '';
        axios.patch('/api/issues/' + issue.id, { assignToUserId: userId || null }).catch(err => {
            toast.error("Failed to assign.")
        })
    }
    return (
        <>
            <Select.Root defaultValue={issue?.assignToUserId || 'unassigned'} onValueChange={assignIssue}>
                <Select.Trigger placeholder='Assign to...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Item value='unassigned'>UnAssigned</Select.Item>
                        <Select.Label>Suggestions</Select.Label>
                        {users?.map((user) => (
                            <Select.Item key={user.id} value={user.id}>{user.email}</Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster position='top-right' />
        </>
        )
    }
const useUsers = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => axios.get('/api/users').then(res => res.data),
    staleTime: 1000 * 60 * 5, // 1 minutes // default 0
    retry: 3
});
export default AssignIssue
