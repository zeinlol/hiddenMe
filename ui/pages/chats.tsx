import { Grid } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { AppLayout } from '../components/Layout/AppLayout'
import { AKDataBoxDefault, AKTitle } from '../components/AKFramework'
import ChatsList from '../components/Objects/Chats/ChatsList'
import { ChatObject } from '../lib/classes/Chat'
import { AppRequestClient } from '../lib/app-client'

export default function Chats() {
  const [ChatElementList, setChatList] = useState<ChatObject[]>([])

  const fetchData = async () => {
    const data = await AppRequestClient.getChatList()
    setChatList(data)
  }

  useEffect(() => {
    fetchData().then()
  }, [])
  return (
    <Grid grow p="lg">
      <Grid.Col xs={12}>
        <AKTitle title="Chats" />
      </Grid.Col>
      <Grid.Col xs={12}>
        <Grid.Col>
          <AKDataBoxDefault>
            <ChatsList items={ChatElementList} reload={fetchData} />
          </AKDataBoxDefault>
        </Grid.Col>
      </Grid.Col>
    </Grid>
  )
}

Chats.getLayout = (page: JSX.Element) => <AppLayout>{page}</AppLayout>
