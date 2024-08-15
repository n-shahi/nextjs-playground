'use client'
import { Cross1Icon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex, Link } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter()
  const [ error, setError ] = useState(false)
  const deleteIssue = async () => {
    try {
      await axios.delete(`/api/issues/${issueId}`)
      router.push('/issues/')
      router.refresh()
    } catch (err) {
      console.error(err)
      setError(true)
    }
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

        <AlertDialog.Root open={error}>
          <AlertDialog.Content>
            <AlertDialog.Title>Error deleting issue</AlertDialog.Title>
            <AlertDialog.Description>
              An error occurred while deleting the issue. Please try again later.
            </AlertDialog.Description>

            <Link href={`/issues/${issueId}`}>
              <Button variant="soft" color="gray" onClick={() => setError(false)} mt='2'>
                OK
              </Button>
            </Link>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </>
    )
  }

  export default DeleteIssueButton
