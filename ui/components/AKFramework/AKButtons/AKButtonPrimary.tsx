import {
  Button,
} from '@mantine/core'
import React, { MouseEventHandler, ReactElement } from 'react'

const DEFAULT_LABEL = 'Submit'
const DEFAULT_BUTTON_TYPE = 'submit'

export interface AKButtonPrimaryProps {
  label?: string;
  type?: 'submit' | 'button'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isFullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick: MouseEventHandler;
    // /** Set text-transform to uppercase */
    // uppercase?: boolean;
    // /** Reduces vertical and horizontal spacing */
    // compact?: boolean;
    // /** Props spread to Loader component */
    // loaderProps?: LoaderProps;
    // /** Loader position relative to button label */
    // loaderPosition?: 'left' | 'right' | 'center';
}

export function AKButtonPrimary({
  label = DEFAULT_LABEL,
  type = DEFAULT_BUTTON_TYPE,
  leftIcon = null,
  rightIcon = null,
  isFullWidth = true,
  loading = false,
  disabled = false,
  onClick,
}: AKButtonPrimaryProps): ReactElement {
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
