import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, Link } from '@radix-ui/themes'
import React from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Button variant='outline' color='red'>
          <Cross1Icon />
          Delete Issue
        </Button>
    )
}

export default DeleteIssueButton
