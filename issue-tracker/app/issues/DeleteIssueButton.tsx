'use client'
import { Cross1Icon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex, Link } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'


const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter()
  const deleteIssue = async () => {
    await axios.delete(`/api/issues/${issueId}`)
    router.push('/issues/')
    router.refresh()
  }
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant='outline' color='red'>
            <Cross1Icon />
            Delete Issue
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content>
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure? This action can't be undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={deleteIssue}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton
