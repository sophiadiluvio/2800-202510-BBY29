'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from '../../components/navbar/communityMember/header';
import Footer from '../../components/navbar/communityMember/footer';

interface Shelter {
  _id: string;
  name: string;
  req?: Record<string, number>;
}

export default function DonationsNeededPage() {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [expandedShelter, setExpandedShelter] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/shelter")
      .then(res => res.json())
      .then((data: Shelter[]) => {
        // for each shelter, rebuild req to only include non-zero entries
        const cleaned = data.map(s => {
          const filteredReq = s.req
            ? Object.fromEntries(
                Object.entries(s.req).filter(([_, amount]) => amount > 0)
              )
            : {};
          return { ...s, req: filteredReq };
        });
        setShelters(cleaned);
      })
      .catch(err => console.error("Failed to load shelters:", err));
  }, []);

  const toggleShelter = (name: string) => {
    setExpandedShelter(prev => (prev === name ? null : name));
  };

  const handleSelectShelter = (shelterName: string) => {
    router.push(
      `/CommunityMember/donation?shelter=${encodeURIComponent(shelterName)}`
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white text-black">
      <Header />
      <h1 className="text-2xl font-bold px-6 pt-4 pb-2">Donations Needed</h1>
      <main className="flex-grow overflow-y-auto px-6 py-4 pb-24 space-y-4">
        <section className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-bold mb-4">All Shelters</h2>
          {shelters.map((shelter, idx) => (
            <div key={idx} className="border-b py-2">
              <div
                onClick={() => toggleShelter(shelter.name)}
                className="font-semibold text-base cursor-pointer hover:text-blue-600"
              >
                {shelter.name}
              </div>

              {expandedShelter === shelter.name &&
                Object.keys(shelter.req || {}).length > 0 && (
                  <div className="mt-2 ml-4 text-sm space-y-1">
                    <p
                      className="text-red-500 font-bold mb-1"
                      style={{ fontSize: '17px' }}
                    >
                      Supplies Requested:
                    </p>
                    {Object.entries(shelter.req!).map(([item, amount]) => (
                      <div key={item} className="flex justify-between">
                        <span>{item}</span>
                        <span>{amount}</span>
                      </div>
                    ))}
                    <button
                      onClick={() => handleSelectShelter(shelter.name)}
                      className="mt-2 px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 text-sm"
                    >
                      Donate to this shelter
                    </button>
                  </div>
                )}
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
