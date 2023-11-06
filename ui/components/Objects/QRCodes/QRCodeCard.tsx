import { Card, Image, Text } from '@mantine/core'
import { QRCodeObject } from '../../../lib/classes/QRCode'
import { AKButtonDanger, AKTitle } from '../../AKFramework'
import { AppRequestClient } from '../../../lib/app-client'

async function deleteQRCode({ item, reload }: { item: QRCodeObject, reload: Function }) {
  const answer = window.confirm(`Are you sure want to delete QR Code "${item.title}"?`)
  if (!answer) {
    return
  }
  await AppRequestClient.deleteQRCodeInstance({ codeUid: item.uid })
  reload()
}

export function QRCodeCard({ item, reload }: { item: QRCodeObject, reload: Function }) {
  return (
    <Card
      withBorder
      padding="lg"
      className="qr-code-card"
    >
      <Card.Section>
        <Image
          src={item.icon}
          alt={item.title}
        />
      </Card.Section>

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
      <AKButtonDanger onClick={() => deleteQRCode({ item, reload })} />

    </Card>
  )
}
