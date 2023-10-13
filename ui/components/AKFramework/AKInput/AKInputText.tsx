import {
  TextInput,
} from '@mantine/core'
import React, { ReactElement } from 'react'

const DEFAULT_PLACEHOLDER = 'some text'

export interface AKInputTextProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function AKInputText({
  label,
  placeholder = DEFAULT_PLACEHOLDER,
  required = false,
  error = undefined,
  value = undefined,
  onChange,
}: AKInputTextProps): ReactElement {
  return (
    <TextInput
      type="text"
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
