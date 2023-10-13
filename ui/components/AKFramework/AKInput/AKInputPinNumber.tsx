import {
  PinInput,
} from '@mantine/core'
import React, { ReactElement } from 'react'

const DEFAULT_PIN_LENGTH = 6

export interface AKInputPinNumberProps {
  label: string;
  error?: boolean;
  oneTimeCode?: boolean;
  value: string;
  length?: number;
  onChange: (value: string) => void;
}

export function AKInputPinNumber({
  label,
  error = undefined,
  length = DEFAULT_PIN_LENGTH,
  oneTimeCode = false,
  value,
  onChange,
}: AKInputPinNumberProps): ReactElement {
  return (
    <PinInput
      size="md"
      type="number"
      error={error}
      length={length}
      oneTimeCode={oneTimeCode}
      aria-label={label}
      value={value}
      onChange={onChange}
    />
  )
}
