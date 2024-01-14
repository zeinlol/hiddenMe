import { useRouter } from 'next/router'
import { Card } from '@mantine/core'
import { useEffect } from 'react'
import { AppLayoutNotAuthorized } from '../../../components/Layout/AppLayoutNotAuthorized'
import { AKTitle } from '../../../components/AKFramework'
import { AppRequestClient } from '../../../lib/app-client'

export default function NewChatPage() {
  const router = useRouter()
  const { codeUid } = router.query

  const fetchData = async () => {
    const data = await AppRequestClient.createChat({ codeUid, formData: { title: 'New chat' } })
    router.push(`/chat/${data.uid}/chat-room`).then()
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
      Please wait to be redirected to new chat room
    </Card>
  )
}

NewChatPage.getLayout = (page: JSX.Element) => <AppLayoutNotAuthorized>{page}</AppLayoutNotAuthorized>
