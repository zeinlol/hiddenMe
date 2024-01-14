import React from 'react'

export interface AKButtonProps {
  label?: string
  type?: 'submit' | 'button' | 'reset' | undefined
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isFullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
    // /** Set text-transform to uppercase */
    // uppercase?: boolean;
    // /** Reduces vertical and horizontal spacing */
    // compact?: boolean;
    // /** Props spread to Loader component */
    // loaderProps?: LoaderProps;
    // /** Loader position relative to button label */
    // loaderPosition?: 'left' | 'right' | 'center';
}
