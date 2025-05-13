
'use client';
import dynamic from 'next/dynamic';

const SearchNav = dynamic(
  () => import('./components/searchNav'),
  { ssr: false }
);

const MapComponent = dynamic(
  () => import('./components/mapBox'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <div className="w-full h-[75vh]">
        <MapComponent />
      </div>

      <div
        id="geocoder"
        className="w-full h-[15vh] bg-white text-black border-t border-black flex items-start justify-center"
      />

      <div className="w-full h-[15vh]">
        <SearchNav />
      </div>
    </>
  );
}
