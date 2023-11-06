import {
  Button,
} from '@mantine/core'
import React, { ReactElement } from 'react'
import { AKButtonProps } from './props'

const DEFAULT_LABEL = 'Delete'
const DEFAULT_BUTTON_TYPE = 'reset'

export function AKButtonDanger({
  label = DEFAULT_LABEL,
  type = DEFAULT_BUTTON_TYPE,
  leftIcon = null,
  rightIcon = null,
  isFullWidth = true,
  loading = false,
  disabled = false,
  onClick,
}: AKButtonProps): ReactElement {
  return (
    <Button
      type={type}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      fullWidth={isFullWidth}
      loading={loading}
      disabled={disabled}
      mt="xl"
      size="md"
      onClick={onClick}
    >
      {label}
    </Button>
  )
}
