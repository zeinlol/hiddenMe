import { Card } from '@mantine/core'
import { MessageObject } from '../../../lib/classes/Message'
import { AKButtonPrimary } from '../../AKFramework'

export function MessageCard({ item, reload }: { item: MessageObject, reload: Function }) {
  return (
    <Card
      withBorder
      padding="lg"
      className="qr-code-card"
    >
      {{ item }}
      <AKButtonPrimary label="Review" onClick={() => reload()} />
    </Card>
  )
}
