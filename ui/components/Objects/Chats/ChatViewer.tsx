import { Paper } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { ChatObject } from '../../../lib/classes/Chat'
import { AppRequestClient } from '../../../lib/app-client'
import { MessageObject } from '../../../lib/classes/Message'
import { MessagesList } from '../Messages/MessagesList'

export function ChatViewer({ chat }: { chat: ChatObject }) {
  const [messageList, setMessageList] = useState<MessageObject[]>([])
  const fetchData = async () => {
    const data = await AppRequestClient.getChatMessages({ chatUid: chat.uid })
    setMessageList(data)
  }

  useEffect(() => {
    fetchData().then()
  }, [])
  return (
    <Paper withBorder>
      <MessagesList messages={messageList} />
    </Paper>
  )
}
