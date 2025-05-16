'use client';

import { useEffect, useState } from 'react';
import Header from '../../../components/navbar/organization/header';
import Footer from '../../../components/navbar/organization/footer';
import InventoryGrid from '../../../components/inventoryGrid';
import Spinner from '../../../components/spinner';


export default function ShelterPage() {
  const [shelter, setShelter] = useState<any>(null);

  useEffect(() => {
    fetch('/api/shelter/68242e341a54584a3161dfd1')
      .then((res) => res.json())
      .then((data) => setShelter(data));
  }, []);

  if (shelter == null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
          <Spinner color="border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />

      <main className="flex-1 p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{shelter.name}</h1>
          <p className="text-gray-700">{shelter.address}</p>
        </div>

        <InventoryGrid shelter={shelter} />
      </main>

      <Footer />
    </div>
  );
}
