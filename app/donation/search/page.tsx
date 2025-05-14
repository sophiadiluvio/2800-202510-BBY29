'use client';

import { useRouter } from 'next/navigation';
import Header from '../../components/navbar/communityMember/header';
import Footer from '../../components/navbar/communityMember/footer';
import MapBox from '../../components/mapBox';
import SearchNav from '../../components/searchNav';


const DonationSearchPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white">
      <div className="w-full h-[75vh]">
        <MapBox />
        </div> 
        <SearchNav />
      </main>
      <Footer />
    </div>
  );
};

export default DonationSearchPage;
