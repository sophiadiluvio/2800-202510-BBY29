'use client';

// not finished just placeholder design


import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/navbar/noAccount/header';
import Footer from '../../components/navbar/noAccount/footer';

export default function ShelterDetailsPage() {
  const { id } = useParams();
  const [shelter, setShelter] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/shelter/${id}`)
      .then(res => res.json())
      .then(data => setShelter(data));
  }, [id]);

  if (!shelter) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main className="flex-1 p-4">
        <p className="text-xl font-bold">name: {shelter.name} address: {shelter.address}</p>
    
        <div className="mt-4">
          {Object.entries(shelter.inv || {}).map(([key, value]) => (
            <p key={key}>{key}: {value as string | number}</p>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
