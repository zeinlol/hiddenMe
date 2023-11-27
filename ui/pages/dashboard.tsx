import { Grid } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { AppLayout } from '../components/Layout/AppLayout'
import { AKTitle } from '../components/AKFramework'
import { AppRequestClient } from '../lib/app-client'
import { DashboardViewer } from '../components/Objects/Dashboard/DashboardViewer'
import { DashboardObject } from '../lib/classes/Dashboard'

export default function Dashboard() {
  const initValue = {
    messages_amount: 0,
    qr_code_amount: 0,
    chats_amount: 0,
  }

  const [dashboardData, setDashboardData] = useState<DashboardObject>(initValue)

  const fetchData = async () => {
    const data = await AppRequestClient.getAccountDashboard()
    setDashboardData(data)
  }

  useEffect(() => {
    fetchData().then()
  }, [])
  return (
    <>
      <Grid grow p="lg">
        <Grid.Col xs={12}>
          <AKTitle title="Dashboard" />
        </Grid.Col>
        <Grid.Col xs={12}>
          <DashboardViewer dashboardData={dashboardData} />
        </Grid.Col>
      </Grid>
    </>
  )
}

Dashboard.getLayout = (page: JSX.Element) => <AppLayout>{page}</AppLayout>
