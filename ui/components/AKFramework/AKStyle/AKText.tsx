import { createStyles, MantineTheme } from '@mantine/core'

export const AKTextStyles = createStyles((theme: MantineTheme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}))
