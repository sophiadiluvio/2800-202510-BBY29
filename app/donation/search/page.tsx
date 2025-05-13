'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/navbar/communityMember/header';
import Footer from '../../components/navbar/communityMember/footer';
import MapBox from '../../components/mapBox';
import SearchBar from '../../components/searchbar';

type Shelter = {
  _id: string;
  name: string;
  address: string;
  lon: number;
  lat: number;
};

const DonationSearchPage = () => {
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const router = useRouter();

  const handleSearchConfirm = () => {
    if (selectedShelter) {
      router.push(`/donation?shelterId=${selectedShelter._id}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white">
        <MapBox />
        <SearchBar
          onSelect={(shelter) => setSelectedShelter(shelter)}
          onSearchConfirm={handleSearchConfirm}
        />
      </main>
      <Footer />
    </div>
  );
};

export default DonationSearchPage;
