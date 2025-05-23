//naviagtion bat at the bottom of the map to select resources near you pages

'use client';

import { useRouter, usePathname } from 'next/navigation';
import { FaTshirt, FaHome, FaFemale } from 'react-icons/fa';
import { GiCannedFish } from "react-icons/gi";
type Props = {
  userLocation: { lat: number; lng: number } | null;
};

export default function SearchNav({ userLocation }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  //handle the clicks on the nav
  function handleClick(category: string) {
    if (!userLocation) {
      alert("User Location not available yet, please try again.");
      return;
    }
  
    const { lat, lng } = userLocation;
  
    //build proper query string
    const params = new URLSearchParams();
    params.set('category', category);
    params.set('lat', lat.toString());
    params.set('lng', lng.toString());
  
    let basePath = pathname;
  
    //clean up path
    if (pathname.endsWith('/map')) {
      basePath = pathname.replace('/map', '');
    }
  
    if (basePath === '') {
      basePath = '/';
    }
  
    const fullUrl = basePath + '/resourcesNearYou?' + params.toString();
  
    const cleanUrl = fullUrl.replace(/^\/+/, '/');
  
    router.push(cleanUrl);
  }
  

  return (
    <div className="w-full bg-white px-4 py-2 flex justify-around items-center shadow-md border-t border-gray-200">

      <button onClick={() => handleClick('women')} className="flex flex-col items-center text-xs text-gray-800">
        <FaFemale className="text-2xl mb-1 text-red-500" />
        <span>Womens Shelter</span>
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
