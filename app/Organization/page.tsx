'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '../components/navbar/organization/header';
import Footer from '../components/navbar/organization/footer';
import Spinner from '../components/spinner';

type ResourceStatus = { [key: string]: number };

export default function OrganizationStatusPage() {
  const router = useRouter();

  const [inventory, setInventory] = useState<ResourceStatus | null>(null);
  const [maxValues, setMaxValues] = useState<ResourceStatus | null>(null);
  const [animateBars, setAnimateBars] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/userShelter')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const shelter = data.userShelter;

        if (!shelter.inv || !shelter.max) {
          throw new Error('Missing inventory or max data');
        }

        const normalizedMax: ResourceStatus = {};
        for (const [key, value] of Object.entries(shelter.max) as [string, number][]) {
          normalizedMax[key.toLowerCase()] = value;
        }

        setInventory(shelter.inv);
        setMaxValues(normalizedMax);
        setTimeout(() => setAnimateBars(true), 100);
      })
      .catch(err => {
        console.error('Error fetching userShelter:', err);
        setError('Failed to load shelter data.');
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  if (!inventory || !maxValues) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <Spinner color="border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <div className="sticky top-0 z-40 bg-white shadow-md">
        <Header />
      </div>

      <main className="flex-1 overflow-y-auto p-4 pb-32">
        <h1 className="text-xl font-bold mb-4">Current Status</h1>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(inventory).map(([label, amount]) => {
            const normalizedLabel = label.toLowerCase();
            const max = maxValues[normalizedLabel] ?? 1;
            const percentage = Math.min(amount / max, 1);

            const color =
              percentage >= 0.66
                ? 'bg-green-500'
                : percentage >= 0.33
                ? 'bg-yellow-400'
                : 'bg-red-500';

            return (
              <div
                key={label}
                className="bg-gray-200 rounded flex flex-col items-center py-4"
              >
                <div className="w-full px-4 h-40 relative">
                  <div className="h-full bg-white rounded border overflow-hidden relative">
                    <div
                      className={`${color} w-full absolute bottom-0 left-0 transition-all duration-700 ease-in-out flex items-end justify-center`}
                      style={{
                        height: animateBars ? `${percentage * 100}%` : 0,
                      }}
                    >
                      <span className="text-black font-bold text-lg pb-1">
                        {amount}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-center">{label}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 space-y-3">
          <button
            className="bg-gray-300 w-full py-2 rounded"
            onClick={() => router.push(`/Organization/update`)}
          >
            Item Update
          </button>
          <button
            className="bg-gray-300 w-full py-2 rounded"
            onClick={() => router.push(`/Organization/resourceRequest`)}
          >
            Resource Request
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
