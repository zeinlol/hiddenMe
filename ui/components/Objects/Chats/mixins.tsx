import { ChatObject } from '../../../lib/classes/Chat'
import { AppRequestClient } from '../../../lib/app-client'

export async function deleteChat({ item, reload }: { item: ChatObject, reload: Function }) {
  const answer = window.confirm(`Are you sure want to delete Chat "${item.title}"?`)
  if (!answer) {
    return
  }
  await AppRequestClient.deleteChatInstance({ chatUid: item.uid })
  if (document.location.pathname.startsWith('/chat/')) {
    document.location.href = '/chats/'
  } else {
    reload()
  }
}
