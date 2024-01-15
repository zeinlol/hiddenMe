import {
  Paper,
  Text,
} from '@mantine/core'
import React, { useState } from 'react'
import { setCookie } from 'cookies-next'
import { AppLogo } from '../components/Base/AppLogo'
import { AKInputText, AKInputPassword, AKButtonPrimary,
  AKTitle, AKInternalLink, useAKStyles } from '../components/AKFramework'
import { AppRequestClient } from '../lib/app-client'

type LogInRequest = {
    username: string;
    password: string;
};

export default function Login() {
  const { classes } = useAKStyles()

  const [logInRequest, setLogInRequest] = useState<LogInRequest>({
    username: '',
    password: '',
  })

  const logIn = async () => {
    try {
      const userInfo = await AppRequestClient.accountLogIn({ formData: logInRequest })
      console.log(userInfo)
      setCookie('hidden-me-auth-token', userInfo.key, { maxAge: 60 * 60 * 24 * 30 })
      document.location.href = '/dashboard'
    } catch (err) {
      console.log('login failed: ', err)
    }
  }

  return (
    <div className={classes.wrapper}>
      <Paper
        className={classes.form}
        radius={0}
        p="sm"
      >
        <AppLogo />
        <AKTitle title="Log In" />
        <form>
          <AKInputText
            label="Username or email"
            placeholder="my_user_name or example@mail.com"
            onChange={(e) => {
              setLogInRequest({ ...logInRequest, username: e.target.value })
            }}
          />
          <AKInputPassword onChange={(e) => {
            setLogInRequest({ ...logInRequest, password: e.target.value })
          }}
          />
          <AKButtonPrimary label="Login" onClick={() => logIn()} />
        </form>
        <Text ta="center" mt="md">
                    Don&apos;t have an account?{' '}
          <AKInternalLink
            href="/register"
            label="Register"
          />
        </Text>
        <Text ta="center" mt="md">
          <AKInternalLink
            href="/terms-and-conditions"
            label="Terms and conditions"
          />
        </Text>
      </Paper>
    </div>
  )
}
