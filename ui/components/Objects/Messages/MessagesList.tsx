import { Card, Grid } from '@mantine/core'
import React from 'react'
import { MessageObject } from '../../../lib/classes/Message'
import { MessageCard } from './MessageCard'

export function MessagesList({ messages, reload }: { messages: MessageObject[], reload: Function }) {
  return (
    <Card
      withBorder
      padding="lg"
    >
      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        messages.map((item, index) => (
          <Grid.Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            key={index}
          >
            <MessageCard item={item} reload={reload} />
          </Grid.Col>
        )))
      }
    </Card>
  )
}
