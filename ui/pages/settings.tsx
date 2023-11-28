import { Grid } from '@mantine/core'
import { deleteCookie } from 'cookies-next'
import { AppLayout } from '../components/Layout/AppLayout'
import { AKButtonDanger, AKTitle } from '../components/AKFramework'
import { AppRequestClient } from '../lib/app-client'

export default function Settings() {
  const userUUID = localStorage.getItem('userUUID') || ''
  const deleteAccount = async () => {
    const answer = window.confirm(`Are you sure want to delete you account? 
All QR codes, messages and chats associated with this account be removed without opportunity to recover them`)
    if (!answer) {
      return
    }
    try {
      await AppRequestClient.deleteAccount({ userUid: userUUID })
      deleteCookie('hidden-me-auth-token')
      window.location.reload()
    } catch (err) {
      console.log('delete account failed: ', err)
    }
  }
  return (
    <>
      <Grid grow p="lg">
        <Grid.Col xs={12}>
          <AKTitle title="Settings" />
        </Grid.Col>
        <Grid.Col xs={12}>
          <AKButtonDanger
            label="Delete account"
            onClick={deleteAccount}
            disabled={userUUID === ''}
            isFullWidth={false}
          />
        </Grid.Col>
      </Grid>
    </>
  )
}

Settings.getLayout = (page: JSX.Element) => <AppLayout>{page}</AppLayout>
