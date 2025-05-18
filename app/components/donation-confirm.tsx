// app/CommunityMember/donation-confirm/DonationConfirmClient.tsx
'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/app/components/navbar/communityMember/header'
import Footer from '@/app/components/navbar/communityMember/footer'

export default function DonationConfirmClient() {
  const [dropoff, setDropoff] = useState<string | null>(null)
  const searchParams = useSearchParams()

  const shelterName = searchParams.get('shelter')
  const donation     = searchParams.get('donation')
  const parsedDonation = donation ? JSON.parse(donation) : {}

  const handleFinalConfirm = () => {
    console.log('Shelter:', shelterName)
    console.log('Donation:', parsedDonation)
    console.log('Drop-off time:', dropoff)
    alert('Donation confirmed!')
  }

  return (
    <main className="…">
      <Header />
      {/* …rest of your card markup… */}
      <Footer />
    </main>
  )
}
