'use client';

import { FaHeart } from 'react-icons/fa';
import { FaTshirt } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaUtensils } from 'react-icons/fa';

export default function searchNav() {
  return (
    <div className="w-full bg-white px-4 py-2 flex justify-around items-center shadow-md border-t border-gray-200">

      <div className="flex flex-col items-center text-xs text-gray-800">
        <FaHeart className="text-2xl mb-1" />
        <span>Favorites</span>
      </div>


      <div className="flex flex-col items-center text-xs text-gray-800">
        <FaUtensils className="text-2xl mb-1" />
        <span>Food</span>
      </div>

  
      <div className="flex flex-col items-center text-xs text-gray-800">
        <FaHome className="text-2xl mb-1" />
        <span>Shelter</span>
      </div>


      <div className="flex flex-col items-center text-xs text-gray-800">
        <FaTshirt className="text-2xl mb-1" />
        <span>Resources</span>
      </div>
    </div>
  );
}
