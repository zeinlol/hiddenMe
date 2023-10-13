import { useState } from 'react'
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, rem, Image } from '@mantine/core'
import {
  IconHome2,
  IconLogout,
  IconShirt,
  IconSettings,
  IconBoxSeam,
  IconTimeline,
} from '@tabler/icons-react'
import { useRouter } from 'next/router'
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

interface NavbarLinkProps {
    icon: React.FC<any>;
    label: string;
    active?: boolean;
    onClick?(): void;
}

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

const navbarOptions = [
  { icon: IconHome2, label: 'Dashboard', route: '/dashboard' },
]

export function AppNavbar() {
  const router = useRouter()
  const [_, setActive] = useState(0)

  const links = navbarOptions.map((link, index) => (
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

  return (
    <Navbar width={{ base: 80 }} p="md">
      <Center>
        <AppIcon />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <ColorSchemeToggle />
          <NavbarLink icon={IconSettings} label="Settings" />
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  )
}
