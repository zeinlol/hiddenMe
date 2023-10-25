import { Grid } from '@mantine/core'
import { AppLayout } from '../components/Layout/AppLayout'
import { AKTitle } from '../components/AKFramework'

export default function Chats() {
  return (
    <>
      <Grid grow p="lg">
        <Grid.Col xs={12}>
          <AKTitle title="Chats" />
        </Grid.Col>
        <Grid.Col xs={12} />
      </Grid>
    </>
  )
}

Chats.getLayout = (page: JSX.Element) => <AppLayout>{page}</AppLayout>
