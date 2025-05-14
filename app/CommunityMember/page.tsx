'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import type { Shelter } from './../types/shelter'; // or correct relative path


import SearchBar from './../components/searchbar';
import Footer from './../components/navbar/communityMember/footer';


const MapComponent = dynamic(() => import('./../components/mapBox'), {
  ssr: false,
}) as React.ComponentType<{ selectedShelter: Shelter | null }>;

export default function CommunityMemberPage() {
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative h-screen w-full bg-white text-black overflow-hidden">
      {/* Header */}
      <div className="bg-yellow-500 text-black p-4 flex justify-between items-center z-10">
        <h1 className="text-xl font-bold">ShelterLink</h1>
        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
          <span className="text-lg">👤</span>
        </div>
      </div>

      {/* Map (fills everything under the header) */}
      <div className="absolute top-16 bottom-32 left-0 right-0 z-0">
        <MapComponent selectedShelter={selectedShelter} />
      </div>

      {/* Expandable Search Panel (floats over map) */}
      <div
        className={`absolute left-0 right-0 bottom-[8rem] bg-purple-100 transition-all duration-300 ease-in-out ${
          expanded ? 'h-[50vh]' : 'h-[72px]'
        } overflow-hidden rounded-t-xl shadow-md z-10`}
      >
        {/* Drag handle */}
        <div
          onClick={() => setExpanded(!expanded)}
          className="w-10 h-1.5 rounded-full bg-gray-400 mx-auto mt-2 cursor-pointer"
        />

        {/* Search & list */}
        <div className="px-4 mt-2">
          <SearchBar onSelect={(shelter) => setSelectedShelter(shelter)} />
        </div>
      </div>

      {/* Fixed Icon Row */}
      <div className="absolute bottom-14 left-0 right-0 flex justify-around py-2 bg-white border-t border-gray-300 text-center text-sm z-10">
        <div className="flex flex-col items-center">
          <span className="text-lg">❤️</span>
          <span>Favorites</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg">🌮</span>
          <span>Food</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg">🏠</span>
<span>Shelter</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg">👕</span>
          <span>Resources</span>
        </div>
      </div>

      {/* Fixed Footer (home + handshake icons) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-200 py-3 flex justify-around z-10">
        <span className="text-2xl">🏠</span>
        <span className="text-2xl">🤝</span>
      </div>
    </div>
  );
}