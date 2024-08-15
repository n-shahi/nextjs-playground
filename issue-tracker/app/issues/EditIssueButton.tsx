import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Link } from '@radix-ui/themes'
import React from 'react'

const EditIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Link href={`/issues/${issueId}/edit`}>
            <Button variant='outline' size="2">
                <Pencil2Icon />Edit Issue
            </Button>
        </Link>
    )
}

export default EditIssueButton
