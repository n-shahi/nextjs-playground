'use client'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, Link } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter()
    const deleteIssue = async () => {
      await axios.delete(`issues/${issueId}`)
      router.push('/issues/')
    }
    return (
        <Button variant='outline' color='red' onClick={deleteIssue}>
          <Cross1Icon />
          Delete Issue
        </Button>
    )
}

export default DeleteIssueButton
