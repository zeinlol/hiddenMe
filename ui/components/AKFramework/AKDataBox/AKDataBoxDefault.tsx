import {
  Paper,
} from '@mantine/core'
import React, { ReactElement } from 'react'

export function AKDataBoxDefault(): ReactElement {
  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      w="100%"
    >
      <slot />
    </Paper>
  )
}
