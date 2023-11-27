import { Card, Text } from '@mantine/core'
import { MessageObject } from '../../../lib/classes/Message'

export function MessageCard({ item }: { item: MessageObject }) {
  const userUUID = localStorage.getItem('userUUID')
  console.log(userUUID)
  return (
    <Card
      withBorder
      padding="lg"
      className={`message-data-box ${item.user === userUUID ? 'personal' : ''}`}
    >
      <Text>{item.text}</Text>
    </Card>
  )
}
