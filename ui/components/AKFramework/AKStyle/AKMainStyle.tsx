import { createStyles, MantineTheme, rem, em } from '@mantine/core'

const color_start = 'hsl(80,100%,50%)'
const color_final = 'hsl(134,100%,77%)'
export const useAKStyles = createStyles((theme: MantineTheme) => ({
  wrapper: {
    height: '100vh',
    background: `linear-gradient(225deg, ${theme.colorScheme === 'dark' ? color_final : color_start} 0%, ${theme.colorScheme === 'dark' ? color_start : color_final} 100%)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]}`,
    // height: '50vh',
    width: em(300),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}))
