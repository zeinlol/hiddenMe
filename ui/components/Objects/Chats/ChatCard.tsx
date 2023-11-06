import { Card, Text } from '@mantine/core'
import { ChatObject } from '../../../lib/classes/Chat'
import { AKButtonDanger, AKTitle } from '../../AKFramework'
import { AppRequestClient } from '../../../lib/app-client'

async function deleteChat({ item, reload }: { item: ChatObject, reload: Function }) {
  const answer = window.confirm(`Are you sure want to delete Chat "${item.title}"?`)
  if (!answer) {
    return
  }
  await AppRequestClient.deleteChatInstance({ chatUid: item.uid })
  reload()
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
      <AKButtonDanger onClick={() => deleteChat({ item, reload })} />

    </Card>
  )
}
