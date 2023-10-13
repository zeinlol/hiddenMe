import {
  Anchor,
} from '@mantine/core'
import React, { ReactElement } from 'react'

export interface AKInternalLinkProps {
  label: string;
  href: string;
}

export function AKInternalLink({
  label,
  href,
}: AKInternalLinkProps): ReactElement {
  return (
    <Anchor<'a'> href={href} weight={700}>
      { label }
    </Anchor>
  )
}
