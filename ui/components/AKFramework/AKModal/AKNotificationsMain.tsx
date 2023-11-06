import { useDisclosure } from '@mantine/hooks'
import { Modal, Button } from '@mantine/core'
import React, { ReactNode } from 'react'

export interface AKModalProps {
  title?: string
  buttonText?: string
  centered?: boolean
  children?: ReactNode; // Define children prop
}
export function AKModal({
  title = '', buttonText = 'View data', centered = true, children }: AKModalProps) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={title}
        centered={centered}
      >
        {children}
      </Modal>
      <Button onClick={open}>{buttonText}</Button>
    </>
  )
}
