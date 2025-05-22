'use client';

import { useEffect, useState } from 'react';
import Header from '../../../components/navbar/communityMember/header';
import Footer from '../../../components/navbar/communityMember/footer';
import InventoryGrid from '../../../components/inventoryGrid';
import Spinner from '../../../components/spinner';
import { useParams } from 'next/navigation';

export default function ShelterPage() {
  const [shelter, setShelter] = useState<any>(null);
    const {id} = useParams();
  useEffect(() => {
   fetch(`/api/shelter/${id}`)
      .then((res) => res.json())
      .then((data) => setShelter(data));
  }, []);

  if (shelter == null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
          <Spinner color="border-yellow-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />

      <main className="flex-1 p-4">
        <div className="mb-3">
          <h1 className="text-2xl font-bold">{shelter.name}</h1>
          <p className="text-gray-700">{shelter.address}</p>
          <p className='text-gray-700'>{shelter.email}</p>
           {shelter.website && (
            <a
              href={shelter.website.startsWith('http') ? shelter.website : `https://${shelter.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Visit Website
            </a>
          )}
        </div>

        <InventoryGrid shelter={shelter} />
      </main>

      <Footer />
    </div>
  );
}
