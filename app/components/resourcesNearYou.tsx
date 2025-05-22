'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import FavouriteButton from '../components/favouriteButton';

export default function ResourcesNearYouPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const lat = parseFloat(searchParams.get('lat') || '');
  const lng = parseFloat(searchParams.get('lng') || '');

  const [shelters, setShelters] = useState([]);

  const pathname = usePathname();
  const basePath = pathname.split('/resourcesNearYou')[0];

  let pageTitle = 'Nearby Resources';

  if (category === 'food') pageTitle = 'Food Support Near You';
  else if (category === 'overnight') pageTitle = 'Overnight Shelters Near You';
  else if (category === 'distribution') pageTitle = 'Clothing and Essentials Near You';
  else if (category === 'favorites') pageTitle = 'Favorite Locations';

  useEffect(() => {
    async function fetchData() {
      const shelterRes = await fetch('/api/shelter');
      const shelterData = await shelterRes.json();

      if (category === 'favorites') {
        const userRes = await fetch('/api/account', { cache: 'no-store' });
        const userData = await userRes.json();

        const favIds = userData.user.favourites.map((id: any) => id.toString());
        const favShelters = shelterData.filter((shelter: any) =>
          favIds.includes(shelter._id.toString())
        );

        setShelters(favShelters);
      } else {
        const filtered = shelterData
          .filter((shelter: any) => shelter.role === category)
          .map((shelter: any) => {
            const distance = getDistance(lat, lng, shelter.lat, shelter.lon);
            return { ...shelter, distance };
          })
          .sort((a, b) => a.distance - b.distance);

        setShelters(filtered);
      }
    }

    fetchData();
  }, [category, lat, lng]);

  function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <main className="flex-1 p-4 pt-6 pb-20">
        <h1 className="text-2xl font-bold mb-4">{pageTitle}</h1>

        {shelters.length === 0 ? (
          <p>No shelters found for this category.</p>
        ) : (
          <ul className="space-y-4">

            {shelters.map((shelter: any) => (
              <li key={shelter._id} className="border rounded shadow-sm hover:bg-gray-50 transition p-4">

                <div className="flex justify-between items-center mb-2">
                  <Link href={`${basePath}/shelter/${shelter._id}`} className="text-lg font-semibold hover:underline">
                    {shelter.name}
                  </Link>
                  <FavouriteButton shelterId={shelter._id.toString()} />
                </div>

                <p className="text-sm text-gray-600">{shelter.address}</p>

                {'distance' in shelter && (
                  <p className="text-sm">{shelter.distance.toFixed(2)} km away</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
