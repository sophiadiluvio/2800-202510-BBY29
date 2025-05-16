'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/navbar/communityMember/header";
import Footer from "../components/navbar/communityMember/footer";
import ShelterSearch from "../components/searchbar";

export default function DonationPage() {
  const router = useRouter();

  const [selectedShelter, setSelectedShelter] = useState<any>(null);
  const [requestedItems, setRequestedItems] = useState<Record<string, number>>({});
  const [donation, setDonation] = useState<Record<string, number>>({});


  useEffect(() => {
    if (selectedShelter) {
      const req = selectedShelter.req || {};
      setRequestedItems(req);

      const initialDonation = Object.keys(req).reduce((acc, key) => {
        acc[key] = 0;
        return acc;
      }, {} as Record<string, number>);

      setDonation(initialDonation);
    }
  }, [selectedShelter]);

  const handleConfirm = () => {
    console.log("Shelter:", selectedShelter?.name);
    console.log("Donation:", donation);
    alert("Donation request submitted!");
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      <Header>
        <h1 className="text-xl font-bold ml-4">Donation</h1>
      </Header>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-semibold text-black whitespace-nowrap">Shelter Name:</span>
          <div className="flex-1">
            <ShelterSearch onSelect={(shelter) => setSelectedShelter(shelter)} />
          </div>
        </div>

        <p><strong>Shelter:</strong> {selectedShelter?.name || "None selected"}</p>

        {selectedShelter && (
  <div className="space-y-6">

    <div>
      <p className="font-semibold">Supplies requested:</p>
      <ul className="list-disc list-inside">
        {Object.entries(requestedItems).map(([item, amount]) => (
          <li key={item}>{item} ({amount})</li>
        ))}
      </ul>
    </div>

    <div className="bg-gray-200 p-4 rounded space-y-4">
      <p className="font-bold text-center">What would you like to donate?</p>

      {Object.entries(requestedItems).map(([item]) => (
        <div key={item} className="flex justify-between items-center">
          <span>{item}</span>
          <div className="flex items-center space-x-2">
            <button onClick={() =>
              setDonation((prev) => ({
                ...prev,
                [item]: Math.max(0, prev[item] - 1),
              }))
            }>
              −
            </button>
            <span>{donation[item]}</span>
            <button onClick={() =>
              setDonation((prev) => ({
                ...prev,
                [item]: prev[item] + 1,
              }))
            }> 
            +
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


        <button
          className="bg-gray-300 py-2 w-full rounded mt-4"
          onClick={handleConfirm}
        >
          Confirm Donation
        </button>
      </div>

      <Footer />
    </main>
  );
}


