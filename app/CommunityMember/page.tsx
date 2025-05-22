'use client';

import { useState } from 'react';
import type { Shelter } from './../types/shelter';
import SearchBar from './../components/searchbar';
import SearchNav from './../components/searchNav';
import DraggableHandle from './../components/draggableHandle';
import Header from "./../components/navbar/communityMember/homepageHeader";
import Footer from "./../components/navbar/communityMember/footer";
import AskAI from './../components/AskAI';
import useUserLocation from './../components/utils/getUserLocation';
import MapComponent from './../components/mapBox';

export default function CommunityMemberPage() {
  const userLocation = useUserLocation();
  const [selectedShelter, setSelectedShelter] = useState<Shelter | undefined>(undefined);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative h-screen w-full bg-white text-black overflow-hidden">
      
      <Header />

      {/*Map*/}
      <div className="absolute top-16 bottom-44 left-0 right-0 z-0">
       <MapComponent selectedShelter={selectedShelter} spinnerColor="border-yellow-600"/>
      </div>

      {/*Expandable Search Panel*/}
      <div
        className={`absolute left-0 right-0 bottom-28 bg-gradient-to-t from-white via-white/100 to-white/90 transition-all duration-300 ease-in-out ${
          expanded ? 'h-[40vh]' : 'h-[72px]'
        } overflow-hidden rounded-t-xl shadow-md z-10`}
        
      >
         {/*Drag handle*/}
        <DraggableHandle onClick={() => setExpanded(!expanded)} />

{/* Search & list */}
<div className="px-4">
  <SearchBar onSelect={(shelter) => setSelectedShelter(shelter)} />
  <AskAI prompt="What can I do to help these shelters?" />
</div>
          
      </div>

      {/*Fixed Icon Row*/}
      <div className="absolute bottom-13 left-0 right-0 z-10">
        <SearchNav userLocation={userLocation} />
      </div>      
      <div className="absolute bottom-0 left-0 right-0 bg-gray-200 py-3 flex justify-around z-10">
       <Footer />
      </div>
    </div>
  );
}