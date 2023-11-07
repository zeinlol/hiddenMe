import { useRouter } from 'next/router'
import React from 'react'
import { AppLayout } from '../../../components/Layout/AppLayout'

export default function NewChatPage() {
  const router = useRouter()
  const { codeUid } = router.query

  // You can use the 'code' variable to access the dynamic part of the URL

  return (
    <div>
      <h1>QR Code page</h1>
      <p>Dynamic Code: {codeUid}</p>
      {/* Add your chat functionality here */}
    </div>
  )
}

NewChatPage.getLayout = (page: JSX.Element) => <AppLayout>{page}</AppLayout>
