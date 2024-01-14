import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Card } from '@mantine/core'
import { AppLayout } from '../../../components/Layout/AppLayout'
import { AKButtonPrimary, AKInputTextArea, AKTitle } from '../../../components/AKFramework'
import { MessageObject } from '../../../lib/classes/Message'
import { MessagesList } from '../../../components/Objects/Messages/MessagesList'
import { AppRequestClient } from '../../../lib/app-client'

type NewMessageData = {
    text: string;
    user: string | null;
}
export default function ChatRoom() {
  const router = useRouter()
  const { chatUid } = router.query
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [messageList, setMessageList] = useState<MessageObject[]>([])
  const fetchMessagesData = async () => {
    const data = await AppRequestClient.getChatMessages({ chatUid })
    setMessageList(data)
  }
  const [MessageNewInstance, setMessageData] = useState<NewMessageData>({
    text: '',
    user: localStorage.getItem('userUUID'),
  })

  useEffect(() => {
    const newSocket = new WebSocket(`${process.env.NEXT_PUBLIC_SOCKET_URL}/api/v1/chat/${chatUid}/web-chat/`)
    setSocket(newSocket)
    newSocket.onopen = async () => {
      console.log('WebSocket connection established.')
      setIsConnected(true)
      await fetchMessagesData()
    }
    newSocket.onmessage = (event) => {
      const received_message = JSON.parse(event.data)
      setMessageList((previousMessages) => [...previousMessages, received_message])
    }
    newSocket.onclose = () => {
      console.log('WebSocket connection closed.')
      setIsConnected(false)
    }
    return () => {
      newSocket.close()
    }
  }, [])
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (MessageNewInstance.text.trim() === '' || socket === null) {
      return
    }
    try {
      socket.send(JSON.stringify(MessageNewInstance))
      setMessageData({ ...MessageNewInstance, text: '' })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <MessagesList messages={messageList} />
      <Card
        withBorder
        padding="lg"
      >
        {isConnected ?
          <form onSubmit={handleSubmit}>
            <AKInputTextArea
              value={MessageNewInstance.text}
              label="New message"
              placeholder="Write your text here"
              onChange={(e) => {
                setMessageData({ ...MessageNewInstance, text: e.target.value })
              }}
            />
            <AKButtonPrimary
              disabled={MessageNewInstance.text.length < 3}
              label="Post comment"
            />
          </form>
          : <AKTitle title="Connection is not escablished. Please refresh this page" />
        }

      </Card>

    </div>
  )
}

ChatRoom.getLayout = (page: JSX.Element) => <AppLayout>{page}</AppLayout>
