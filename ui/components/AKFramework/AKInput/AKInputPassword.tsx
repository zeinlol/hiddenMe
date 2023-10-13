import {
  PasswordInput,
} from '@mantine/core'
import React, { ReactElement } from 'react'

const DEFAULT_LABEL = 'Password'
const DEFAULT_PLACEHOLDER = 'not_QWERTY123!'

export interface AKInputPasswordProps {
  label?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

export function AKInputPassword({
  label = DEFAULT_LABEL,
  placeholder = DEFAULT_PLACEHOLDER,
  required = false,
  error = undefined,
  value = undefined,
  onChange,
}: AKInputPasswordProps): ReactElement {
  return (
    <PasswordInput
      label={label}
      placeholder={placeholder}
      mt="md"
      size="md"
      onChange={onChange}
      required={required}
      error={error}
      value={value}
    />
  )
}
