'use client';

import Header from '../../components/navbar/organization/header';
import Footer from '../../components/navbar/organization/footer';
import ResourcesNearYou from '../../components/resourcesNearYou';

export default function ResourcesNearYouPage() {

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />

      <ResourcesNearYou />

      <Footer />
    </div>
  );
}
