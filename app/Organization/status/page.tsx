'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '../../components/navbar/organization/header';
import Footer from '../../components/navbar/organization/footer';
import Spinner from '../../components/spinner';

// Define a type for the resource data
type ResourceStatus = {
  [key: string]: number;
};

export default function OrganizationStatusPage() {
  const router = useRouter();
  const { id } = useParams();

  const [resourceStatus, setResourceStatus] = useState<ResourceStatus | null>(null);
  const [animateBars, setAnimateBars] = useState(false);

  // Fetch shelter data
  useEffect(() => {
    fetch(`/api/shelter/${id}`)
      .then(res => res.json())
      .then(data => {
        setResourceStatus(data.resources);
        setTimeout(() => setAnimateBars(true), 100);
      });
  }, [id]);

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

      {/* Resource Bars */}
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

      {/* Action Buttons */}
      <div className="mt-6 px-6 space-y-3">
        <button
          className="bg-gray-300 w-full py-2 rounded"
          onClick={() => router.push(`/organization/update/${id}`)}
        >
          Item Update
        </button>
        <button
          className="bg-gray-300 w-full py-2 rounded"
          onClick={() => router.push(`/organization/resources/${id}`)}
        >
          Resource Request
        </button>
      </div>

      <Footer />
    </main>
  );
}
