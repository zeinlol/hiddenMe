import { useState } from 'react'
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, rem } from '@mantine/core'
import {
  IconHome2,
  IconLogout,
  IconQrcode,
  IconMessages,
  IconSettings,
} from '@tabler/icons-react'
import { useRouter } from 'next/router'
import { deleteCookie } from 'cookies-next'
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle'
import { AppIcon } from '../Base/AppIcon'

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}))

function logOut() {
  deleteCookie('hidden-me-auth-token')
  window.location.reload()
}

interface NavbarLinkProps {
    icon: React.FC<any>
    label: string
    active?: boolean
    onClick?(): void
}

const navbarTopOptions = [
  { icon: IconHome2, label: 'Dashboard', route: '/dashboard' },
  { icon: IconQrcode, label: 'QR Codes', route: '/qrcodes' },
  { icon: IconMessages, label: 'Chats', route: '/chats' },
]

const navbarBottomOptions = [
  { icon: IconSettings, label: 'Settings', route: '/settings' },
  { icon: IconLogout, label: 'Log out', route: '/logout', onClick: () => logOut() },
]

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles()
  return (
    <Tooltip
      label={label}
      position="right"
      transitionProps={{ duration: 0 }}
    >
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  )
}
export function AppNavbar() {
  const router = useRouter()
  const [_, setActive] = useState(0)

  const linksOnTop = navbarTopOptions.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={link.route.split('/')[1] === router.pathname.split('/')[1]}
      onClick={() => {
        setActive(index)
        router.push(link.route)
      }}
    />
  ))
  const linksOnBottom = navbarBottomOptions.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={link.route.split('/')[1] === router.pathname.split('/')[1]}
      onClick={() => {
        setActive(index)
        if (link.onClick !== undefined) {
          link.onClick()
        } else {
          router.push(link.route)
        }
      }}
    />
  ))

  return (
    <Navbar width={{ base: 80 }} p="md">
      <Center>
        <AppIcon />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {linksOnTop}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <ColorSchemeToggle />
          {linksOnBottom}
        </Stack>
      </Navbar.Section>
    </Navbar>
  )
}
