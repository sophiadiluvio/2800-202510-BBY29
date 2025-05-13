// /app/page.tsx
'use client';
import dynamic from 'next/dynamic';

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
        className="w-full h-[20vh] bg-white text-black border-t border-black flex items-start justify-center"
      />
    </>
  );
}
