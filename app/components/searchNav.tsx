'use client';

import { useRouter, usePathname } from 'next/navigation';
import { FaHeart, FaTshirt, FaHome, FaUtensils } from 'react-icons/fa';
import { GiCannedFish } from "react-icons/gi";
type Props = {
  userLocation: { lat: number; lng: number } | null;
};

export default function SearchNav({ userLocation }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function handleClick(category: string) {
    if (!userLocation) {
      alert("Location not available yet.");
      return;
    }

    const { lat, lng } = userLocation;

    const params = new URLSearchParams(window.location.search);

    params.set('category', category);
    params.set('lat', lat.toString());
    params.set('lng', lng.toString());
  
    let basePath = pathname;

    if (pathname.endsWith('/map')) {
      basePath = pathname.replace(/\/map$/, '');
      console.log("asdasdasd")
    }

     router.push(`${basePath}/resourcesNearYou?${params.toString()}`);

  }

  return (
    <div className="w-full bg-white px-4 py-2 flex justify-around items-center shadow-md border-t border-gray-200">

      <button onClick={() => handleClick('favorites')} className="flex flex-col items-center text-xs text-gray-800">
        <FaHeart className="text-2xl mb-1 text-red-500" />
        <span>Favorites</span>
      </button>

      <button onClick={() => handleClick('food')} className="flex flex-col items-center text-xs text-gray-800">
        <GiCannedFish className="text-2xl mb-1 text-yellow-600" />
        <span>Food Banks</span>
      </button>

      <button onClick={() => handleClick('overnight')} className="flex flex-col items-center text-xs text-gray-800">
        <FaHome className="text-2xl mb-1 text-blue-500" />
        <span>Overnight Shelter</span>
      </button>

      <button onClick={() => handleClick('distribution')} className="flex flex-col items-center text-xs text-gray-800">
        <FaTshirt className="text-2xl mb-1 text-green-500" />
        <span>Resources</span>
      </button>

    </div>
  );
}
