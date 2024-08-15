import { Status } from '@prisma/client'
import { Flex, Badge } from '@radix-ui/themes'
import React from 'react'

interface Props {
    status: Status
}
const statusMap: Record<
    Status,
    { label: string, color: "yellow" | "red" | "violet" | "green" }
> = {
    NEW: { label: 'New', color: 'yellow' },
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'Progress', color: 'violet' },
    CLOSED: { label: 'Closed', color: 'green' },
}

const IssueStatusBadge = ({ status }: Props) => {
    return (
        <Flex gap="2">
            <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
        </Flex>
    )
}
export default IssueStatusBadge
