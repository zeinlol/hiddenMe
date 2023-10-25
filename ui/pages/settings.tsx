import { Grid } from '@mantine/core'
import { AppLayout } from '../components/Layout/AppLayout'
import { AKTitle } from '../components/AKFramework'

export default function Settings() {
  return (
    <>
      <Grid grow p="lg">
        <Grid.Col xs={12}>
          <AKTitle title="Settings" />
        </Grid.Col>
        <Grid.Col xs={12} />
      </Grid>
    </>
  )
}

Settings.getLayout = (page: JSX.Element) => <AppLayout>{page}</AppLayout>
