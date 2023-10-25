import { Grid } from '@mantine/core'
import { AppLayout } from '../components/Layout/AppLayout'
import { AKTitle } from '../components/AKFramework'

export default function QRCodes() {
  return (
    <>
      <Grid grow p="lg">
        <Grid.Col xs={12}>
          <AKTitle title="QR Codes" />
        </Grid.Col>
        <Grid.Col xs={12} />
      </Grid>
    </>
  )
}

QRCodes.getLayout = (page: JSX.Element) => <AppLayout>{page}</AppLayout>
