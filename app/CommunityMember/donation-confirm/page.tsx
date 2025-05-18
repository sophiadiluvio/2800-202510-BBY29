// app/CommunityMember/donation-confirm/page.tsx
import { Suspense } from 'react'
import DonationConfirmClient from '../../components/donation-confirm'

export default function DonationConfirmPage() {
  return (
    <Suspense fallback={<div>Loading donation details…</div>}>
      <DonationConfirmClient />
    </Suspense>
  )
}
