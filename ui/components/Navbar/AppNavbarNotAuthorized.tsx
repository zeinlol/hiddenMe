import React from 'react'
import {
  IconLogin,
  IconUserPlus,
  IconBrandOffice,
} from '@tabler/icons-react'
import { AppNavbarBase } from './AppNavbarBase'

const navbarTopOptions = [
  { icon: IconBrandOffice, label: 'Terms and conditions', route: '/terms-and-conditions' },
]

const navbarBottomOptions = [
  { icon: IconLogin, label: 'Log in', route: '/login' },
  { icon: IconUserPlus, label: 'Register', route: '/register' },
]

const navbarOptions = {
  topOptions: navbarTopOptions,
  bottomOptions: navbarBottomOptions,
}

export function AppNavbarNotAuthorized() {
  return <AppNavbarBase navbarOptions={navbarOptions} />
}
