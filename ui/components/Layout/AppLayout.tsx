import { AppShell } from '@mantine/core'
import { ReactNode } from 'react'
import { AppNavbar } from '../Navbar/AppNavbar'

export const AppLayout = ({
  children,
}: {
    children: ReactNode;
}): JSX.Element => (
  <AppShell
    padding="md"
    navbar={<AppNavbar />}
    styles={(theme) => ({
      main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
    })}
  >
    {children}
  </AppShell>
)
