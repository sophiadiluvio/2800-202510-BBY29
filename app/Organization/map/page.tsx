'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { Shelter } from '../../types/shelter';
import SearchBar from '../../components/searchbar';
import SearchNav from '../../components/searchNav';
import Footer from "../../components/navbar/organization/footer";
import DraggableHandle from '../../components/draggableHandle';



const MapComponent = dynamic(() => import('../../components/mapBox'), {
  ssr: false,
}) as React.ComponentType<{ selectedShelter: Shelter | null }>;

export default function OrganizationPage() {
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative h-screen w-full bg-white text-black overflow-hidden">
      
      {/* Header */}
        <div className="bg-blue-500 text-black p-4 flex justify-between items-center z-10 relative">
         {/* Left spacer to match profile icon width */}
          <div className="w-8 h-8" />

          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
          ShelterLink</h1>

        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
          <span className="text-lg">👤</span>
        </div>
      </div>


      {/*Map*/}
      <div className="absolute top-16 bottom-44 left-0 right-0 z-0">
        <MapComponent selectedShelter={selectedShelter} />
      </div>

      {/*Expandable Search Panel*/}
      <div
        className={`absolute left-0 right-0 bottom-28 bg-purple-100 transition-all duration-300 ease-in-out ${
          expanded ? 'h-[50vh]' : 'h-[72px]'
        } overflow-hidden rounded-t-xl shadow-md z-10`}
      >
        <DraggableHandle onClick={() => setExpanded(!expanded)} />

        {/* Search & list */}
        <div className="px-4 ">
          <SearchBar onSelect={(shelter) => setSelectedShelter(shelter)} />
        </div>
      </div>

      {/* Fixed Icon Row */}
      <div className="absolute bottom-13 left-0 right-0 z-10">
        <SearchNav />
      </div>

      {/* Fixed Footer Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
      <Footer />
      </div>

    </div>
  );
}