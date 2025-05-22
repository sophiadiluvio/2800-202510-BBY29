
'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { makeDonation } from '../../actions/makeDonation'
import Header from "../../components/navbar/communityMember/header";
import Footer from "../../components/navbar/communityMember/footer";
import ShelterSearch from "../../components/searchbar";

export default function DonationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shelterName = searchParams.get("shelter");

  const [selectedShelter, setSelectedShelter] = useState<any>(null);
  const [requestedItems, setRequestedItems] = useState<Record<string, number>>({});
  const [donation, setDonation] = useState<Record<string, number>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedWindow, setSelectedWindow] = useState<number[] | null>(null);

  useEffect(() => {
    if (shelterName) {
      fetch("/api/shelter")
        .then(res => res.json())
        .then(data => {
          const selected = data.find((s: any) => s.name === shelterName);
          if (selected) setSelectedShelter(selected);
        });
    }
  }, [shelterName]);

  useEffect(() => {
    if (selectedShelter) {
      const req = selectedShelter.req || {};
      setRequestedItems(req);
      const initial = Object.keys(req).reduce((acc, key) => {
        acc[key] = 0;
        return acc;
      }, {} as Record<string, number>);
      setDonation(initial);
    }
  }, [selectedShelter]);

  const handleConfirm = () => {
    setShowPopup(true);
  };

  const handleWindowSelect = (window: number[]) => {
    setSelectedWindow(window);

    const now = new Date();
    const opening = new Date(now);
    opening.setDate(opening.getDate() + window[0]);

    const closing = new Date(now);
    closing.setDate(closing.getDate() + window[1]);

    const openingDate = opening.toISOString().split('T')[0];
    const closingDate = closing.toISOString().split('T')[0];

    makeDonation(selectedShelter._id, donation, openingDate, closingDate);
    router.push("/CommunityMember/profile");
  };


  return (
    <main className="h-screen bg-white text-black font-sans flex flex-col overflow-x-hidden">
      <Header>
        <h1 className="text-xl font-bold ml-4">Donation</h1>
      </Header>

      <div className="flex-grow overflow-y-auto px-4 p-6 space-y-4 pb-16">
        <div className="w-full max-w-screen-sm mx-auto">
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
                    }>−</button>
                    <span>{donation[item]}</span>
                    <button onClick={() =>
                      setDonation((prev) => ({
                        ...prev,
                        [item]: prev[item] + 1,
                      }))
                    }>+</button>
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
    {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 px-4">
    <div className="bg-yellow-400 border border-black rounded-xl shadow-xl w-full max-w-sm p-6 space-y-4 text-center">
      <h2 className="text-xl font-extrabold text-black">Confirm Donation Request</h2>
      <p className="text-sm text-black font-medium">
        When would you like<br />to drop off your donations?
      </p>

      <div className="grid grid-cols-3 gap-2">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-2 rounded"
          onClick={() => handleWindowSelect([1, 3])}
        >
          1 to 3 days
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-2 rounded"
          onClick={() => handleWindowSelect([4, 7])}
        >
          4 to 7 days
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-2 rounded"
          onClick={() => handleWindowSelect([7, 14])}
        >
          1 to 2 weeks
        </button>
      </div>

      <button
        className="mt-4 bg-yellow-200 hover:bg-yellow-300 text-black font-semibold py-2 px-4 rounded w-full"
        onClick={() => setShowPopup(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}




      <Footer />
    </main>
  );
}