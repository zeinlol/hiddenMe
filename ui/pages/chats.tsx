import {
  Paper,
  Text,
  Anchor,
} from '@mantine/core'
import React, { useState } from 'react'
import { fetchWrapper } from '../lib/fetchWrapper'
import { AppLogo } from '../components/Base/AppLogo'
import { AKInputEmail, AKInputPassword, AKButtonPrimary, AKTitle, useAKStyles } from '../components/AKFramework'

type LogInRequest = {
    email: string;
    password: string;
};

export default function Login() {
  const { classes } = useAKStyles()
  // const { classes } = useAKStyles(theme)

  const [logInRequest, setLogInRequest] = useState<LogInRequest>({
    email: '',
    password: '',
  })

  const logIn = async () => {
    try {
      await fetchWrapper('/api/v1/auth/signin', {
        method: 'POST',
        body: JSON.stringify(logInRequest),
      })
      window.location.reload()
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
        <AKInputEmail onChange={(e) => {
          setLogInRequest({ ...logInRequest, email: e.target.value })
        }}
        />
        <AKInputPassword onChange={(e) => {
          setLogInRequest({ ...logInRequest, password: e.target.value })
        }}
        />
        <AKButtonPrimary label="Login" onClick={() => logIn()} />

        <Text ta="center" mt="md">
                    Don&apos;t have an account?{' '}
          <Anchor<'a'> href="/register" weight={700}>
                        Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  )
}
