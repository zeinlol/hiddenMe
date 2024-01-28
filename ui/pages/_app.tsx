import NextApp, { AppContext, AppProps } from 'next/app'
import { deleteCookie, getCookie } from 'cookies-next'
import Head from 'next/head'
import { ColorScheme, ColorSchemeProvider, MantineProvider, MantineThemeOverride } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { AppRequestClient } from '../lib/app-client'
import '../lib/styles/global.css'
import { unauthenticatedRoutes } from '../lib/constants/unauthenticatedRoutes'
// noinspection LongLine
const theme: MantineThemeOverride = {
  colors: {
    // eslint-disable-next-line max-len
    primary: ['#b6ff99', '#bdff80', '#b0ff66', '#b8ff4d', '#3381ff', '#1a71ff', '#0061ff', '#0057e6', '#004ecc', '#0044b3'],
    // eslint-disable-next-line max-len
    accent: ['#deffbf', '#dfffb0', '#dfffa0', '#d3ff90', '#80f2ff', '#70f1ff', '#60efff', '#56d7e6', '#4dbfcc', '#43a7b3'],
    // eslint-disable-next-line max-len
    black: ['#a5a99d', '#919385', '#777d6d', '#606854', '#3c4d52', '#23363d', '#0b2027', '#0a1d23', '#091a1f', '#071317'],
    // eslint-disable-next-line max-len
    white: ['#f7f7f7', '#f5f5f5', '#f3f3f3', '#f1f1f1', '#efefef', '#ededed', '#ebebeb', '#d4d4d4', '#bcbcbc', '#a5a5a5'],
    red: ['#ffb6be', '#ffa4ae', '#ff929d', '#ff808d', '#ff6d7d', '#ff5b6c', '#ff495c', '#e64253', '#cc3a4a', '#b33340'],
  },
  primaryColor: 'primary',
}

const AuthProvider = ({
  children,
}: {
    children: ReactNode;
}): JSX.Element => {
  const [ready, setReady] = useState<boolean>(false)
  const loading = useRef(false)

  const redirectAuthenticated = () => {
    document.location.href = '/dashboard'
  }

  const authSuccess = () => {
    if (document.location.pathname === '/login') {
      redirectAuthenticated()
      return
    }
    setReady(true)
  }

  const authFailure = () => {
    deleteCookie('hidden-me-auth-token')
    // only redirect to log in if we're not already on an unauthenticated route
    const isPathInList = unauthenticatedRoutes.some(route => {
      const regex = new RegExp(`^${route}$`)
      return regex.test(document.location.pathname)
    })
    if (!isPathInList) {
      document.location.href = '/login'
      setReady(true)
    }
    setReady(true)
  }

  useEffect(() => {
    (async () => {
      if (loading.current) {
        return
      }
      loading.current = true
      const authToken = getCookie('hidden-me-auth-token')
      if (authToken === '' || authToken === null || typeof authToken === 'undefined') {
        authFailure()
        return
      }
      let userUUID = localStorage.getItem('userUUID') || ''
      // maybe we have the access token, but we're missing the userUUID from localStorage
      if (userUUID === '') {
        console.log('missing userUUID')
        // try to set it first before redirecting
        try {
          const res = await AppRequestClient.getAccountGetMyInfo()
          userUUID = res?.uid || ''
        } catch (e) {
          authFailure()
          return
        }
        if (userUUID === '') {
          authFailure()
          return
        }
        localStorage.setItem('userUUID', userUUID)
      }
      // we definitely have the userUUID, so we can try to authenticate
      // if we authenticated within the last 30 minutes, we don't need to do anything
      if (userUUID !== '') {
        authSuccess()
      }
    })().catch(e => {
      console.log(e)
      authFailure()
    })
  }, [])

  return <>{ready && children}</>
}
export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme)

  const router = useRouter()

  const setupInProgress = useRef(false)

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(nextColorScheme)
  }
  useEffect(() => {
    if (router.pathname === '/') {
      router.push('/dashboard').then()
    }
    if (setupInProgress.current) {
      return
    }
    setupInProgress.current = true

    // register dark theme media query listener
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
    darkThemeMq.onchange = (e) => {
      if (e.matches) {
        toggleColorScheme('dark')
      } else {
        toggleColorScheme('light')
      }
    }
  }, [router.pathname])

  const getLayout = (Component as any).getLayout || ((page: any) => page)

  return (
    <>
      <Head>
        <title>Hidden Me</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <AuthProvider>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            theme={{ ...theme, colorScheme } as any}
            withGlobalStyles
            withNormalizeCSS
          >
            <Notifications />
            {getLayout(<Component {...pageProps} />)}
          </MantineProvider>
        </ColorSchemeProvider>
      </AuthProvider>
    </>
  )
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext)
  return {
    ...appProps,
    colorScheme: getCookie('hidden-me-color-scheme', appContext.ctx) || 'dark',
    appToken: getCookie('hidden-me-auth-token', appContext.ctx) || '',
  }
}
