import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Text } from '@mantine/core'
import { AppLayout } from '../../../components/Layout/AppLayout'
import ChatsList from '../../../components/Objects/Chats/ChatsList'
import { QRCodeObject } from '../../../lib/classes/QRCode'
import { AKTitle } from '../../../components/AKFramework'
import { AppRequestClient } from '../../../lib/app-client'
import { ChatObject } from '../../../lib/classes/Chat'

export default function NewChatPage() {
  const router = useRouter()
  const { codeUid } = router.query
  const [qrCodeData, setQRData] = useState<QRCodeObject>()
  const [ChatList, setChatList] = useState<ChatObject[]>([])

  const fetchQRCodeData = async () => {
    const data = await AppRequestClient.getQRCodeInstance({ codeUid })
    setQRData(data)
  }
  const fetchQRCodeChatList = async () => {
    const data = await AppRequestClient.getQRCodeChatList({ codeUid })
    setChatList(data)
  }
  useEffect(() => {
    fetchQRCodeData().then()
    fetchQRCodeChatList().then()
  }, [])
  return (
    <div>
      <AKTitle title={`QR Code ${qrCodeData?.title}`} />
      {qrCodeData?.description &&
        <Text
          mt="sm"
          mb="md"
          c="dimmed"
          fz="xs"
        >
          { qrCodeData.description }
        </Text>
      }
      <ChatsList items={ChatList} reload={fetchQRCodeChatList} />
    </div>
  )
}

NewChatPage.getLayout = (page: JSX.Element) => <AppLayout>{page}</AppLayout>
