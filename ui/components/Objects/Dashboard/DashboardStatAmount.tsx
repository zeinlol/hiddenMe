import { Paper, Text, createStyles, Group, rem } from '@mantine/core'
import React from 'react'
import { Icon } from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}))

export interface StatsGridProps {
    title: string;
    icon: Icon;
    value: number
}

export function DashboardStatElement({ statElement }: { statElement: StatsGridProps }) {
  const { classes } = useStyles()
  const IconTag = statElement.icon
  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      key={statElement.title}
    >
      <Group position="apart">
        <IconTag
          className={classes.icon}
          size="1.4rem"
          stroke={1.5}
        />
        <Text
          size="xs"
          color="dimmed"
          className={classes.title}
        >
          {statElement.title}
        </Text>
        <Text fz="lg" className={classes.value}>{statElement.value}</Text>
      </Group>
    </Paper>
  )
}
