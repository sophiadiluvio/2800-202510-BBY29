'use client';

import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Header from '../../components/navbar/organization/header';
import { createShelter } from '../../actions/createShelter';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function CreateShelterPage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('food');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const geocoderRef = useRef<any>(null);

  useEffect(() => {
    if (!geocoderRef.current) {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken!,
      placeholder: 'Search for shelter address',
      mapboxgl: mapboxgl as unknown as typeof import('mapbox-gl'),
    });

      geocoder.addTo('#geocoder-container');

      geocoder.on('result', (e: any) => {
        const coords = e.result.geometry.coordinates;
        setAddress(e.result.place_name);
        setLon(String(coords[0]));
        setLat(String(coords[1]));
      });

      geocoderRef.current = geocoder;
    }
  }, []);

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      <Header>
        <h1 className="text-xl font-bold">ShelterLink</h1>
      </Header>

      <div className="flex flex-col items-center justify-center flex-grow space-y-4 mt-10 text-center">
        <h2 className="text-lg font-semibold text-blue-600">Shelter Information</h2>

        <form
          action={createShelter}
          onSubmit={(e) => {
            if (!lat || !lon || !address) {
              e.preventDefault();
              alert('Please select a valid address using the search box.');
            }
          }}
          className="flex flex-col gap-4"
        >
          <input
            name="name"
            type="text"
            placeholder="Shelter Name"
            className="bg-gray-200 text-center py-2 px-4 w-64 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div id="geocoder-container" className="w-64" />
          <input type="hidden" name="address" value={address} />
          <input type="hidden" name="lat" value={lat} />
          <input type="hidden" name="lon" value={lon} />

          <div className="flex flex-col items-start">
            {['food', 'overnight', 'women', 'distribution'].map((roleOption) => (
              <label key={roleOption} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value={roleOption}
                  checked={type === roleOption}
                  onChange={() => setType(roleOption)}
                />
                {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
              </label>
            ))}
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 px-8 rounded">
            Create Shelter
          </button>
        </form>
      </div>
    </main>
  );
}
