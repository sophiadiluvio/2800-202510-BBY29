'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '../../../../components/navbar/organization/header';
import Footer from '../../../../components/navbar/organization/footer';
import Spinner from '../../../../components/spinner';

type ResourceStatus = {
  [key: string]: number;
};

export default function OrganizationStatusPage() {
  const router = useRouter();
  const { id } = useParams();

  const [resourceStatus, setResourceStatus] = useState<ResourceStatus | null>(null);
  const [animateBars, setAnimateBars] = useState(false);
  const [error, setError] = useState<string | null>(null); // NEW

  useEffect(() => {
    if (!id) return; 

    fetch(`/api/shelter/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!data.inv) throw new Error('Missing inv in API response');
        setResourceStatus(data.inv);
        setTimeout(() => setAnimateBars(true), 100);
      })
      .catch(err => {
        console.error('Error fetching shelter:', err);
        setError('Failed to load shelter data.');
      });
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  if (!resourceStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <Spinner color="border-green-600" />
      </div>
    );
  }

  const max = Math.max(...Object.values(resourceStatus));

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      <Header>
        <h1 className="text-xl font-bold ml-4">Current Status</h1>
      </Header>

      <div className="grid grid-cols-2 gap-4 px-6 mt-6">
        {Object.entries(resourceStatus).map(([label, amount]) => {
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
              <div className="mt-2 text-sm capitalize text-center">
                {label.replace(/([A-Z])/g, ' $1')}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 px-6 space-y-3">
        <button
          className="bg-gray-300 w-full py-2 rounded"
          onClick={() => router.push(`/Organization/update`)}
        >
          Item Update
        </button>
        <button
          className="bg-gray-300 w-full py-2 rounded"
          onClick={() => router.push(`/Organization/resources`)}
        >
          Resource Request
        </button>
      </div>

      <Footer />
    </main>
  );
}
