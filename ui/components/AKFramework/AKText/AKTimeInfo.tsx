import { Text } from '@mantine/core'
import React, { ReactElement } from 'react'
import { AKTextStyles } from '../AKStyle/AKText'

export interface AKTitleProps {
  title: string;
}

export function AKTimeInfo({ title }: AKTitleProps): ReactElement {
  const { classes } = AKTextStyles()
  return (
    <Text
      className={classes.title}
      ta="left"
      mt="md"
      mb={30}
    >{title}
    </Text>
  )
}
