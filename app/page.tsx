'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import SearchBar from './components/searchbar';

const SearchNav = dynamic(
  () => import('./components/searchNav'),
  { ssr: false }
);

const MapComponent = dynamic(
  () => import('./components/mapBox'),
  { ssr: false }
);

type Shelter = {
  _id: string;
  name: string;
  address: string;
  lon: number;
  lat: number;
};

export default function Home() {
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  return (
    <>
    <div className="w-full h-[75vh] relative">
    <MapComponent selectedShelter={selectedShelter} />
    
      <div className="w-full h-[75vh]">
        <SearchBar onSelect={(shelter) => setSelectedShelter(shelter)} />
        </div>
      </div>
      <div className="w-full h-[20vh] bg-white text-black border-t border-black flex items-start justify-center" />
    </>

    
        /*
        { <MapComponent /> }
        { <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md"> }
        id="geocoder"

        className="w-full h-[20vh] bg-white text-black border-t border-black flex items-start justify-center"
        </>
    */

  );
}