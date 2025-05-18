'use client';

import { Suspense } from 'react'
import Header from '../../components/navbar/communityMember/header';
import Footer from '../../components/navbar/communityMember/footer';
import ResourcesNearYou from '../../components/resourcesNearYou';
import Spinner from '../../components/spinner';

export default function ResourcesNearYouPage() {

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />

      <Suspense fallback={<Spinner color="border-yellow-600" />}>
              <ResourcesNearYou />
            </Suspense>
      
      <Footer />
    </div>
  );
}
