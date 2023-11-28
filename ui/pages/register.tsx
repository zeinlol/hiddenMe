import {
  Paper,
  Group,
  Text,
  Box,
  Popover,
  Progress, em,
} from '@mantine/core'
import React, { useState } from 'react'
import { setCookie } from 'cookies-next'
import { AppLogo } from '../components/Base/AppLogo'
import {
  AKPasswordRequirement,
  AKButtonPrimary,
  AKInputEmail,
  AKInputPassword,
  AKInternalLink,
  AKTitle,
  useAKStyles,
  passwordRequirements, AKInputText, getPasswordStrength,
} from '../components/AKFramework'
import { AppRequestClient } from '../lib/app-client'

type RegisterRequest = {
    username: string;
    first_name: string;
    last_name: string
    email: string;
    password1: string;
    password2: string;
}

export default function Register() {
  const { classes } = useAKStyles()
  const [popoverOpened, setPopoverOpened] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [validEmail, setValidEmail] = useState(true)
  const [registerRequest, setRegisterRequest] = useState<RegisterRequest>({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password1: '',
    password2: '',
  })
  const passwordChecks = passwordRequirements.map((requirement, index) => (
    <AKPasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(registerRequest.password1)}
    />
  ))

  const strength = getPasswordStrength({ password: registerRequest.password1 })
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red'

  const accountRegistration = async () => {
    if (!passwordsMatch) {
      return
    }
    if (!validEmail) {
      return
    }
    await AppRequestClient.accountRegister({ formData: registerRequest })
    const user_info = await AppRequestClient.accountLogIn({
      formData: {
        email: registerRequest.email,
        password: registerRequest.password1,
      },
    })
    setCookie('hidden-me-auth-token', user_info.key, { maxAge: 60 * 60 * 24 * 30 })
    window.location.reload()
  }

  return (
    <div className={classes.wrapper}>
      <Paper
        className={classes.form}
        radius={0}
        p={30}
        w={em(900)}
      >
        <AppLogo />
        <AKTitle title="Register" />
        <AKInputText
          label="Username"
          placeholder="my_user_name"
          value={registerRequest.username}
          onChange={(e) => setRegisterRequest({ ...registerRequest, username: e.target.value })}
        />

        <Group
          position="center"
          mb={15}
          grow
        >
          <AKInputText
            label="First name"
            placeholder="John"
            value={registerRequest.first_name}
            onChange={(e) => setRegisterRequest({ ...registerRequest, first_name: e.target.value })}
          />
          <AKInputText
            label="Last name"
            placeholder="Parker"
            value={registerRequest.last_name}
            onChange={(e) => setRegisterRequest({ ...registerRequest, last_name: e.target.value })}
          />
        </Group>
        <AKInputEmail
          label="Email address"
          value={registerRequest.email}
          error={!validEmail ? 'Invalid email address' : undefined}
          onChange={(e) => {
            setRegisterRequest({ ...registerRequest, email: e.target.value })
            setValidEmail(/\S+@\S+\.\S+/.test(e.target.value))
          }}
        />
        <Box mx="auto">
          <Popover
            opened={popoverOpened}
            position="bottom"
            width="target"
            transitionProps={{ transition: 'pop' }}
          >
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}
              >
                <AKInputPassword
                  label="Password"
                  value={registerRequest.password1}
                  onChange={(e) => {
                    setRegisterRequest({ ...registerRequest, password1: e.target.value })
                    setPasswordsMatch(registerRequest.password2 === e.target.value)
                  }}
                />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Progress
                color={color}
                value={strength}
                size={5}
                mb="xs"
              />
              <AKPasswordRequirement
                label="Includes at least 6 characters"
                meets={registerRequest.password1.length > 5}
              />
              {passwordChecks}
            </Popover.Dropdown>
          </Popover>
        </Box>
        <AKInputPassword
          label="Confirm password"
          value={registerRequest.password2}
          error={passwordsMatch ? undefined : 'Passwords do not match'}
          onChange={(e) => {
            setRegisterRequest({
              ...registerRequest, password2: e.target.value,
            })
            setPasswordsMatch(e.target.value === registerRequest.password1)
          }}
        />
        <AKButtonPrimary
          isFullWidth
          onClick={accountRegistration}
          label="Register"
        />
        <Text ta="center" mt="md">
                        Already have an account?{' '}
          <AKInternalLink
            href="/login"
            label="Log In"
          />
        </Text>
      </Paper>
    </div>
  )
}
