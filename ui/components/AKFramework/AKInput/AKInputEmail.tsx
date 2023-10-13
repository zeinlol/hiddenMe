import {
  TextInput,
} from '@mantine/core'
import React, { ReactElement } from 'react'

const DEFAULT_LABEL = 'Email address'
const DEFAULT_PLACEHOLDER = 'example@gmail.com'

export interface AKInputEmailProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function AKInputEmail({
  label = DEFAULT_LABEL,
  placeholder = DEFAULT_PLACEHOLDER,
  required = false,
  error = undefined,
  value = undefined,
  onChange,
}: AKInputEmailProps): ReactElement {
  return (
    <TextInput
      type="email"
      label={label}
      placeholder={placeholder}
      size="md"
      onChange={onChange}
      required={required}
      error={error}
      value={value}
    />
  )
}
