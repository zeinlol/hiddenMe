import { QRCodeObject } from '../../../lib/classes/QRCode'
import { AKButtonPrimary } from '../../AKFramework'

export function QRCodeOrderButton({ item }: { item: QRCodeObject }) {
  async function QRCodeOrderLogic() {
    console.log(`Order for QR: ${item.uid}`)
    window.confirm('This project is demo. You can not order QR sticker')
  }
  return (
    <AKButtonPrimary label="Order sticker" onClick={() => QRCodeOrderLogic()} />
  )
}
