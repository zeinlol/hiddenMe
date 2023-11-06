import {
  Paper,
} from '@mantine/core'
import React, { ReactElement, ReactNode } from 'react'

interface AKDataBoxDefaultProps {
  children?: ReactNode; // Define children prop
}

export function AKDataBoxDefault({ children }: AKDataBoxDefaultProps): ReactElement {
  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      w="100%"
    >
      {children}
    </Paper>
  )
}
