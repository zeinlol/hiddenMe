import { Grid } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { AppLayout } from '../components/Layout/AppLayout'
import { AKTitle, AKDataBoxDefault } from '../components/AKFramework'
import { AppRequestClient } from '../lib/app-client'
import QRCodesList from '../components/Objects/QRCodes/QRCodesList'
import { QRCodeObject } from '../lib/classes/QRCode'
import QRCodeNew from '../components/Objects/QRCodes/QRCodeNew'

export default function QRCodes() {
  const [QRList, setQRList] = useState<QRCodeObject[]>([])

  const fetchData = async () => {
    const data = await AppRequestClient.getQRCodeList()
    setQRList(data)
  }

  useEffect(() => {
    fetchData().then()
  }, [])
  return (
    <>
      <Grid grow p="lg">
        <Grid.Col xs={12}>
          <AKTitle title="QR Codes" />
        </Grid.Col>
        <Grid.Col>
          <QRCodeNew update={fetchData} />
        </Grid.Col>
        <Grid.Col>
          <AKDataBoxDefault>
            <QRCodesList items={QRList} reload={fetchData} />
          </AKDataBoxDefault>
        </Grid.Col>
      </Grid>
    </>
  )
}

QRCodes.getLayout = (page: JSX.Element) => <AppLayout>{page}</AppLayout>
