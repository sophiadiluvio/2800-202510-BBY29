//resources near you page with green headers for un logged in users
'use client';

import { Suspense } from 'react'
import Header from '../components/navbar/noAccount/header';
import Footer from '../components/navbar/noAccount/footer';
import ResourcesNearYou from '../components/resourcesNearYou';
import Spinner from '../components/spinner';

export default function ResourcesNearYouPage() {

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />

      <Suspense fallback={<Spinner color="border-green-600" />}>
        <ResourcesNearYou color="border-green-600"/>
      </Suspense>

      <Footer />
    </div>
  );
}
