'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Home, MapPin, PlusCircle } from 'lucide-react';

export default function Footer() {
  const router = useRouter();
  const [shelterId, setShelterId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/account')
      .then(res => res.json())
      .then(data => {

        setShelterId(data.user?.shelterId || null);
      })
      .catch(err => {
        console.error('Failed to fetch shelter ID:', err);
      });
  }, []);

  const handleRedirectToStatus = () => {
    if (shelterId) {
      router.push(`/Organization/shelter/${shelterId}/status`);
    } else {
      alert('Shelter ID not found.');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-500 py-3 px-6 flex justify-around items-center border-t border-gray-400 z-50">
      <Link href="/Organization/map">
        <div className="flex flex-col items-center">
          <MapPin size={30} />
        </div>
      </Link>

      <button onClick={handleRedirectToStatus} className="flex flex-col items-center">
        <Home size={30} />
      </button>

      <Link href="/Organization/update">
        <div className="flex flex-col items-center">
          <PlusCircle size={30} />
        </div>
      </Link>
    </div>
  );
}
