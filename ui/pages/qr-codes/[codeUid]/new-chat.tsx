import { useRouter } from 'next/router'
import { AppLayoutNotAuthorized } from '../../../components/Layout/AppLayoutNotAuthorized'

export default function NewChatPage() {
  const router = useRouter()
  const { codeUid } = router.query

  return (
    <div>
      <h1>New Chat Page</h1>
      <p>Dynamic Code: {codeUid}</p>
    </div>
  )
}

NewChatPage.getLayout = (page: JSX.Element) => <AppLayoutNotAuthorized>{page}</AppLayoutNotAuthorized>
