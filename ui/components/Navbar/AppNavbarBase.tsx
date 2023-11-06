import React, { useState } from 'react'
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, rem } from '@mantine/core'
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
    icon: React.FC<any>
    label: string
    route: string
    active?: boolean
    onClick?(): void
}

interface navbarOptionsProps {
    topOptions: NavbarLinkProps[]
    bottomOptions: NavbarLinkProps[]
}

function NavbarLink({ icon: Icon, label, active, onClick = () => ({}) }: NavbarLinkProps) {
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
export function AppNavbarBase({ navbarOptions }: { navbarOptions: navbarOptionsProps }) {
  const router = useRouter()
  const [_, setActive] = useState(0)

  const linksOnTop = navbarOptions.topOptions.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={link.route.split('/')[1] === router.pathname.split('/')[1]}
      onClick={() => {
        setActive(index)
        router.push(link.route).then()
      }}
    />
  ))
  const linksOnBottom = navbarOptions.bottomOptions.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={link.route.split('/')[1] === router.pathname.split('/')[1]}
      onClick={() => {
        setActive(index)
        if (link.onClick !== undefined) {
          link.onClick()
        } else {
          router.push(link.route).then()
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
