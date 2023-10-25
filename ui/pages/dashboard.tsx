import { Grid } from '@mantine/core'
import { AppLayout } from '../components/Layout/AppLayout'
import { AKTitle } from '../components/AKFramework'

export default function Dashboard() {
  return (
    <>
      <Grid grow p="lg">
        <Grid.Col xs={12}>
          <AKTitle title="Dashboard" />
        </Grid.Col>
        <Grid.Col xs={12} />
      </Grid>
    </>
  )
}

Dashboard.getLayout = (page: JSX.Element) => <AppLayout>{page}</AppLayout>
