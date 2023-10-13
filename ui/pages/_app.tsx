import NextApp, { AppProps, AppContext } from 'next/app'
import { getCookie, setCookie } from 'cookies-next'
import Head from 'next/head'
import { MantineProvider, ColorScheme, ColorSchemeProvider, MantineThemeOverride } from '@mantine/core'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { AKNotificationsMain } from '../components/AKFramework'

// noinspection LongLine
const theme: MantineThemeOverride = {
  colors: {
    primary: ['#b6ff99', '#bdff80', '#b0ff66', '#b8ff4d', '#3381ff', '#1a71ff', '#0061ff', '#0057e6', '#004ecc', '#0044b3'],
    accent: ['#deffbf', '#dfffb0', '#dfffa0', '#d3ff90', '#80f2ff', '#70f1ff', '#60efff', '#56d7e6', '#4dbfcc', '#43a7b3'],
    black: ['#a5a99d', '#919385', '#777d6d', '#606854', '#3c4d52', '#23363d', '#0b2027', '#0a1d23', '#091a1f', '#071317'],
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
    console.log('redirectAuthenticated')
    // const hiddenMeDomain =
    //         process.env.NODE_ENV === 'development'
    //           ? 'hiddenMe.localhost'
    //           : 'hiddenMe.io'
    // document.location.href = hiddenMeDomain
    //   ? '/installations'
    //   : '/dashboard'
  }

  const unauthenticatedRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/chats',
  ]

  const authSuccess = () => {
    console.log('authSuccess')
    if (document.location.pathname === '/login') {
      redirectAuthenticated()
      return
    }
    setReady(true)
  }

  const authFailure = () => {
    // only redirect to log in if we're not already on an unauthenticated route
    // if (!unauthenticatedRoutes.includes(document.location.pathname)) {
    //   document.location.href = '/login'
    //   setReady(true)
    // } else {
    //   setReady(true)
    // }
    setReady(true)
  }

  useEffect(() => {
    (async () => {
      console.log('useEffect')
      if (loading.current) return
      loading.current = true
      let userUUID = localStorage.getItem('userUUID') || ''
      // maybe we have the access token, but we're missing the userUUID from localStorage
      if (userUUID === '') {
        console.log('missing userUUID')
        const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL
        // try to set it first before redirecting
        const res = await fetch(`${BASE_API_URL}account/user/`, {
          method: 'GET',
        })

        if (res.status !== 200) {
          authFailure()
          return
        }

        const data = res.json()
        userUUID = data?.uid || ''
        if (userUUID === '') {
          authFailure()
          return
        }
        localStorage.setItem('userUUID', userUUID)
      }
      // we definitely have the userUUID, so we can try to authenticate
      // if we authenticated within the last 30 minutes, we don't need to do anything
      if (userUUID !== '' && localStorage.getItem('lastAuth') != null) {
        const t1 = new Date(localStorage.getItem('lastAuth') || '')
        const t2 = new Date()

        if (t2.getTime() - t1.getTime() < 1000 * 60 * 30) {
          authSuccess()
          return
        }
        localStorage.removeItem('lastAuth')
      }
    })().catch(_ => {
      authFailure()
    })
  }, [])

  return <>{ready && children}</>
}
export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme)

  const setupInProgress = useRef(false)

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(nextColorScheme)
    setCookie('hidden-me-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 })
  }
  useEffect(() => {
    if (setupInProgress.current) return
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
  }, [])

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
            <AKNotificationsMain />
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
    appToken: getCookie('hidden_me_token', appContext.ctx) || '',
  }
}
