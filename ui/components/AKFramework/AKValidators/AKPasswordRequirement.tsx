import { Box, Text } from '@mantine/core'
import React from 'react'
import { IconCheck, IconX } from '@tabler/icons-react'

export interface AKPasswordRequirementProps {
    meets: boolean;
    label: string;
}

export function AKPasswordRequirement({ meets, label }: AKPasswordRequirementProps) {
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size="0.9rem" /> : <IconX size="0.9rem" />} <Box ml={10}>{label}</Box>
    </Text>
  )
}
