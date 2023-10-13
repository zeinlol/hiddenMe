import { Title } from '@mantine/core'
import React, { ReactElement } from 'react'
import { AKTextStyles } from '../AKStyle/AKText'

export interface AKTitleProps {
  title: string;
}

export function AKTitle({ title }: AKTitleProps): ReactElement {
  const { classes } = AKTextStyles()
  return (
    <Title
      order={3}
      className={classes.title}
      ta="left"
      mt="md"
      mb={30}
    >{title}
    </Title>
  )
}
