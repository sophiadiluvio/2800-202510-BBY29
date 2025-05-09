// /app/page.tsx
'use client';
import dynamic from 'next/dynamic';

const MapboxExample = dynamic(
  () => import('./components/mapBox'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <div className="w-full h-[75vh]">
        <MapboxExample />
      </div>

      <div
        id="geocoder"
        className="w-full h-[20vh] bg-white text-black border-t border-black flex items-start justify-center"
      />
    </>
  );
}
