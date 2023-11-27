import { Paper, Grid, SimpleGrid } from '@mantine/core'
import React from 'react'
import {
  IconQrcode,
  IconMessageCircle,
  IconMessages,
} from '@tabler/icons-react'
import { DashboardObject } from '../../../lib/classes/Dashboard'
import { DashboardStatElement, StatsGridProps } from './DashboardStatAmount'

export function DashboardViewer({ dashboardData }: { dashboardData: DashboardObject }) {
  const dashboardConfig: StatsGridProps[] = [
    {
      title: 'QR Codes',
      icon: IconQrcode,
      value: dashboardData.qr_code_amount,
    },
    {
      title: 'Chats',
      icon: IconMessages,
      value: dashboardData.chats_amount,
    },
    {
      title: 'Messages',
      icon: IconMessageCircle,
      value: dashboardData.messages_amount,
    },
  ]
  return (
    <Paper withBorder>
      <Grid grow p="lg">
        {dashboardConfig.length === 0 ? (
          <p>No QR Codes yet.</p>
        ) :
          (
            dashboardConfig.map((item, index) => (
              <Grid.Col xs={12} key={index}>
                <SimpleGrid
                  cols={4}
                  breakpoints={[
                    { maxWidth: 'md', cols: 2 },
                    { maxWidth: 'xs', cols: 1 },
                  ]}
                >
                  <DashboardStatElement statElement={item} />
                </SimpleGrid>
              </Grid.Col>))
          )
        }
      </Grid>
    </Paper>
  )
}
