import React, { ReactElement } from 'react'

export interface AKLinkProps {
  label: string;
  href: string;
}

export function AKExternalLink({
  label,
  href,
}: AKLinkProps): ReactElement {
  return (
    <p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    </p>
  )
}
