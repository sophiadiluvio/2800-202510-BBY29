'use client';

import { Suspense } from 'react'
import Header from "../../components/navbar/communityMember/header";
import Footer from "../../components/navbar/communityMember/footer";
import DonationInner from "../../components/DonationInner";
import Spinner from '../../components/spinner';

export default function DonationPage() {
  return (
    <main className="h-screen bg-white text-black font-sans flex flex-col overflow-x-hidden">
      <Header>
        <h1 className="text-xl font-bold ml-4">Donation</h1>
      </Header>

      <Suspense fallback={<Spinner color="border-yellow-600" />}>
      <DonationInner />
      </Suspense>
      <Footer />
    </main>
  );
}
