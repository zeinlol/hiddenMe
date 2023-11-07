import { useRouter } from 'next/router'
import { Card } from '@mantine/core'
import { useEffect, useState } from 'react'
import { AppLayoutNotAuthorized } from '../../../components/Layout/AppLayoutNotAuthorized'
import { AKTitle } from '../../../components/AKFramework'
import { ChatViewer } from '../../../components/Objects/Chats/ChatViewer'
import { AppRequestClient } from '../../../lib/app-client'
import { ChatObject } from '../../../lib/classes/Chat'

export default function NewChatPage() {
  const router = useRouter()
  const { codeUid } = router.query
  const [chatData, setChatData] = useState<ChatObject>()

  const fetchData = async () => {
    const data = await AppRequestClient.createChat({ codeUid, formData: { title: 'Unknown new chat' } })
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
      <AKTitle title="New Chat" />
      {chatData ? <ChatViewer chat={chatData} /> : <AKTitle title="Please try again later" />}

    </Card>
  )
}

NewChatPage.getLayout = (page: JSX.Element) => <AppLayoutNotAuthorized>{page}</AppLayoutNotAuthorized>
