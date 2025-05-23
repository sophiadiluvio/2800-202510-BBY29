'use client';

import { Suspense } from 'react'
import Header from '../../components/navbar/organization/header';
import Footer from '../../components/navbar/organization/footer';
import ResourcesNearYou from '../../components/resourcesNearYou';
import Spinner from '../../components/spinner';

export default function ResourcesNearYouPage() {

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />

      <Suspense fallback={<Spinner color="border-blue-600" />}>
              <ResourcesNearYou color="border-blue-600"/>
            </Suspense>

      <Footer />
    </div>
  );
}
