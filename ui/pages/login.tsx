import {
  Paper,
  Text,
} from '@mantine/core'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { AppLogo } from '../components/Base/AppLogo'
import { AKInputText, AKInputPassword, AKButtonPrimary,
  AKTitle, AKInternalLink, useAKStyles } from '../components/AKFramework'
import { AppRequestClient } from '../app/app-client'

type LogInRequest = {
    username: string;
    password: string;
};

export default function Login() {
  const { classes } = useAKStyles()
  const router = useRouter()
  // const { classes } = useAKStyles(theme)

  const [logInRequest, setLogInRequest] = useState<LogInRequest>({
    username: '',
    password: '',
  })

  const logIn = async () => {
    try {
      await AppRequestClient.accountLogIn({ formData: logInRequest })
      router.push('/dashboard')
      // window.location.reload()
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

        <Text ta="center" mt="md">
                    Don&apos;t have an account?{' '}
          <AKInternalLink
            href="/register"
            label="Register"
          />
        </Text>
      </Paper>
    </div>
  )
}
