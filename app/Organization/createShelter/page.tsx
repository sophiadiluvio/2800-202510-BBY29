'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/navbar/organization/header';
import { createShelter } from '../../actions/createShelter';

export default function CreateShelterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('food');

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      <Header>
        <h1 className="text-xl font-bold">ShelterLink</h1>
      </Header>

      <div className="flex flex-col items-center justify-center flex-grow space-y-4 mt-10 text-center">
        <h2 className="text-lg font-semibold text-blue-600">Shelter Information</h2>

        <form action={createShelter} className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="Shelter Name"
            className="bg-gray-200 text-center py-2 px-4 w-64 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            name="address"
            type="text"
            placeholder="address"
            className="bg-gray-200 text-center py-2 px-4 w-64 rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <div className="flex flex-col items-start">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="food"
                checked={type === 'food'}
                onChange={() => setType('food')}
              />
              Food
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="overnight"
                checked={type === 'overnight'}
                onChange={() => setType('overnight')}
              />
              Overnight
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="women"
                checked={type === 'women'}
                onChange={() => setType('women')}
              />
              Women
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="distribution"
                checked={type === 'distribution'}
                onChange={() => setType('distribution')}
              />
              Distribution
            </label>
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 px-8 rounded">
            Create Shelter
          </button>
        </form>
      </div>
    </main>
  );
}
