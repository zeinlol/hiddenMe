import React from 'react'
import {
  IconLogin,
} from '@tabler/icons-react'
import { AppNavbarBase } from './AppNavbarBase'

const navbarBottomOptions = [
  { icon: IconLogin, label: 'Log in', route: '/login' },
]

const navbarOptions = {
  topOptions: [],
  bottomOptions: navbarBottomOptions,
}

export function AppNavbarNotAuthorized() {
  return <AppNavbarBase navbarOptions={navbarOptions} />
}
