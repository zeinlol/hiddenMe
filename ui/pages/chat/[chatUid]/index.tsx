import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Card, Text } from '@mantine/core'
import { AppLayout } from '../../../components/Layout/AppLayout'
import { ChatViewer } from '../../../components/Objects/Chats/ChatViewer'
import { AKButtonDanger, AKTitle } from '../../../components/AKFramework'
import { AppRequestClient } from '../../../lib/app-client'
import { ChatObject } from '../../../lib/classes/Chat'
import { deleteChat } from '../../../components/Objects/Chats/mixins'

export default function NewChatPage() {
  const router = useRouter()
  const { chatUid } = router.query
  const [chatData, setChatData] = useState<ChatObject>()

  const fetchData = async () => {
    const data = await AppRequestClient.getChatInstance({ chatUid })
    setChatData(data)
  }
  useEffect(() => {
    fetchData().then()
  }, [])
  return (
    <Card
      withBorder
      padding="lg"
    >
      {chatData ?
        <div>
          <AKTitle title={chatData.title} />
          <AKButtonDanger
            isFullWidth={false}
            onClick={() => deleteChat({ item: chatData, reload: fetchData })}
          />
          <Text
            mt="sm"
            mb="md"
            c="dimmed"
            fz="xs"
          >
            { chatData.description }
          </Text>
          <ChatViewer chat={chatData} />
        </div>
        : <AKTitle title="Please try again later" />}
    </Card>
  )
}

NewChatPage.getLayout = (page: JSX.Element) => <AppLayout>{page}</AppLayout>
