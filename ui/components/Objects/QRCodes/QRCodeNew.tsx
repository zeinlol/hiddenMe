import React, { useState } from 'react'
import { AKButtonPrimary, AKInputText, AKModal } from '../../AKFramework'
import { AppRequestClient } from '../../../lib/app-client'

type NewQRCodeData = {
    title: string;
    description: string;
}
function QRCodesList({ update }: { update: Function }) {
  const [QRCodeNewInstance, updateData] = useState<NewQRCodeData>({
    title: 'New QR',
    description: '',
  })
  async function generateQRCode() {
    await AppRequestClient.createQRCode({ formData: QRCodeNewInstance })
    await update()
  }
  return (
    <AKModal buttonText="Add new QR Code">
      <AKInputText
        label="QR code title"
        onChange={(e) => {
          updateData({ ...QRCodeNewInstance, title: e.target.value })
        }}
      />
      <AKInputText
        label="Description"
        onChange={(e) => {
          updateData({ ...QRCodeNewInstance, description: e.target.value })
        }}
      />
      <AKButtonPrimary label="Create" onClick={() => generateQRCode()} />
    </AKModal>
  )
}

export default QRCodesList
