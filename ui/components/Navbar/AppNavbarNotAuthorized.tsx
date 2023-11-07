import React from 'react'
import {
  IconLogin,
  IconUserPlus,
} from '@tabler/icons-react'
import { AppNavbarBase } from './AppNavbarBase'

const navbarBottomOptions = [
  { icon: IconLogin, label: 'Log in', route: '/login' },
  { icon: IconUserPlus, label: 'Register', route: '/register' },
]

const navbarOptions = {
  topOptions: [],
  bottomOptions: navbarBottomOptions,
}

export function AppNavbarNotAuthorized() {
  return <AppNavbarBase navbarOptions={navbarOptions} />
}
