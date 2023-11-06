import { AppShell } from '@mantine/core'
import { ReactNode } from 'react'
import { AppNavbarNotAuthorized } from '../Navbar/AppNavbarNotAuthorized'

export const AppLayoutNotAuthorized = ({
  children,
}: {
    children: ReactNode
}): JSX.Element => (
  <AppShell
    padding="md"
    navbar={<AppNavbarNotAuthorized />}
    styles={(theme) => ({
      main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
    })}
  >
    {children}
  </AppShell>
)
