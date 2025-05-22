'use client';

import { useState, useEffect } from 'react';
import type { Shelter } from './types/shelter';
import SearchBar from './components/searchbar';
import SearchNav from './components/searchNav';
import DraggableHandle from './components/draggableHandle';
import Footer from "./components/navbar/noAccount/footer";
import Header from "./components/navbar/noAccount/homepageHeader";
import useUserLocation from './components/utils/getUserLocation';
import MapComponent from './components/mapBox';


export default function NoLoginMemberPage() {
  const [selectedShelter, setSelectedShelter] = useState<Shelter | undefined>(undefined);
  const [expanded, setExpanded] = useState(false);
  const userLocation = useUserLocation();

  return (
    <div className="relative h-screen w-full bg-white text-black overflow-hidden">
        <div>
           <Header/>
      </div>
      <div className="absolute top-16 bottom-44 left-0 right-0 z-0">
        <MapComponent selectedShelter={selectedShelter} spinnerColor="border-green-600"/>
      </div>
      <div
        className={`absolute left-0 right-0 bottom-28 bg-purple-100 transition-all duration-300 ease-in-out ${
          expanded ? 'h-[40vh]' : 'h-[72px]'
        } overflow-hidden rounded-t-xl shadow-md z-10`}
      >
        <DraggableHandle onClick={() => setExpanded(!expanded)} />

        <div className="px-4">
          <SearchBar onSelect={(shelter: any) => setSelectedShelter(shelter)} />
        </div>
      </div>
      <div className="absolute bottom-13 left-0 right-0 z-10">
      <SearchNav userLocation={userLocation} />
      </div>      
      <div className="absolute bottom-0 left-0 right-0 bg-gray-200 py-3 flex justify-around z-10">
       <Footer />
      </div>
    </div>
  );
}