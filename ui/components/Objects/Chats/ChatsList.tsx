import React from 'react'
import { Grid, Container } from '@mantine/core'
import { ChatCard } from './ChatCard'
import { ChatObject } from '../../../lib/classes/Chat'

function ChatsList({ items, reload }: { items: ChatObject[], reload: Function }) {
  return (
    <Container>
      <Grid justify="center">
        {items.length === 0 ? (
          <p>No chats to display.</p>
        ) : (
          items.map((item, index) => (
            <Grid.Col
              xs={12}
              sm={12}
              md={4}
              lg={3}
              xl={2}
              key={index}
            >
              <ChatCard item={item} reload={reload} />
            </Grid.Col>
          )))
        }

      </Grid>

    </Container>
  )
}

export default ChatsList
