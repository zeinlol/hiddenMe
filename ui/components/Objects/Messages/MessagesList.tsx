import { Card } from '@mantine/core'
import React from 'react'
import { MessageObject } from '../../../lib/classes/Message'
import { MessageCard } from './MessageCard'

export function MessagesList({ messages }: { messages: MessageObject[] }) {
  return (
    <Card
      withBorder
      padding="lg"
      className="messages-list-box"
    >
      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        messages.map(item => (
          <MessageCard
            item={item}
            key={item.uid}
          />
        )))
      }
    </Card>
  )
}
