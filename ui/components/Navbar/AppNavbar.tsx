import React from 'react'
import {
  IconHome2,
  IconLogout,
  IconQrcode,
  IconMessages,
  IconSettings,
} from '@tabler/icons-react'
import { deleteCookie } from 'cookies-next'
import { AppNavbarBase } from './AppNavbarBase'

function logOut() {
  deleteCookie('hidden-me-auth-token')
  window.location.reload()
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

const navbarOptions = {
  topOptions: navbarTopOptions,
  bottomOptions: navbarBottomOptions,
}

export function AppNavbar() {
  return <AppNavbarBase navbarOptions={navbarOptions} />
}
