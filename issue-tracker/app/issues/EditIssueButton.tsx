import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Link } from '@radix-ui/themes'
import React from 'react'

const EditIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Button variant='outline'>
            <Link href={`issues/${issueId}/edit`}>
                <Pencil2Icon />
                Edit Issue
            </Link>
        </Button>
    )
}

export default EditIssueButton
