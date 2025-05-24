//shelter info page for the organization
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/navbar/organization/header';
import Footer from '../../../components/navbar/organization/footer';
import InventoryGrid from '../../../components/inventoryGrid';
import Spinner from '../../../components/spinner';

export default function ShelterPage() {
  const [shelter, setShelter] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/shelter/${id}`)
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
        <div className="mb-0">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">{shelter.name}</h1>
          </div>
          <p className="text-gray-700">{shelter.address}</p>
          <p className='text-gray-700'>{shelter.email}</p>
           {shelter.website && (
            <a
              href={shelter.website.startsWith('http') ? shelter.website : `https://${shelter.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-0 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
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
