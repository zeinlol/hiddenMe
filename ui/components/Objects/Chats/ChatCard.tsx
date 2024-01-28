import { Card, Text } from '@mantine/core'
import { ChatObject } from '../../../lib/classes/Chat'
import { AKButtonDanger, AKButtonPrimary, AKTitle } from '../../AKFramework'
import { deleteChat } from './mixins'

async function openChat({ item }: { item: ChatObject }) {
  document.location.href = `/chat/${item.uid}/chat-room`
}

export function ChatCard({ item, reload }: { item: ChatObject, reload: Function }) {
  return (
    <Card
      withBorder
      padding="lg"
      className="qr-code-card"
    >
      <AKTitle title={item.title} />
      {item.description &&
          <Text
            mt="sm"
            mb="md"
            c="dimmed"
            fz="xs"
          >
            { item.description }
          </Text>
      }
      <AKButtonPrimary label="Review" onClick={() => openChat({ item })} />
      <AKButtonDanger onClick={() => deleteChat({ item, reload })} />
    </Card>
  )
}
