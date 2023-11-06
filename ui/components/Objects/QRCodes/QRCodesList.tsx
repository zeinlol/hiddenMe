import React from 'react'
import { Grid, Container } from '@mantine/core'
import { QRCodeCard } from './QRCodeCard'
import { QRCodeObject } from '../../../lib/classes/QRCode'

function QRCodesList({ items, reload }: { items: QRCodeObject[], reload: Function }) {
  return (
    <Container>
      <Grid justify="center">

        {items.length === 0 ? (
          <p>No QR Codes yet.</p>
        ) : (
          items.map((item, index) => (
            <Grid.Col
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              key={index}
            >
              <QRCodeCard item={item} reload={reload} />
            </Grid.Col>
          )))
        }
      </Grid>

    </Container>
  )
}

export default QRCodesList
