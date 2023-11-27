import { Card } from '@mantine/core'
import { useState } from 'react'
import { AppRequestClient } from '../../../lib/app-client'
import { AKButtonPrimary, AKInputTextArea } from '../../AKFramework'

type NewMessageData = {
    text: string;
}
export function NewMessageForm({ chatUid, reload }: { chatUid: string, reload: Function }) {
  const [MessageNewInstance, updateData] = useState<NewMessageData>({
    text: '',
  })
  async function createMessage() {
    await AppRequestClient.postNewMessageInChat({ chatUid, formData: MessageNewInstance })
    updateData({ ...MessageNewInstance, text: '' })
    await reload()
  }
  const userUUID = localStorage.getItem('userUUID')
  console.log(userUUID)
  return (
    <Card
      withBorder
      padding="lg"
    >
      <AKInputTextArea
        value={MessageNewInstance.text}
        label="New message"
        placeholder="Write your text here"
        onChange={(e) => {
          updateData({ ...MessageNewInstance, text: e.target.value })
        }}
      />
      <AKButtonPrimary
        disabled={MessageNewInstance.text.length < 3}
        label="Post comment"
        onClick={() => createMessage()}
      />
    </Card>
  )
}
