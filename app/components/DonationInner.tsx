'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { makeDonation } from '@/app/actions/makeDonation';
import ShelterSearch from "../components/searchbar";

export default function DonationInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shelterName = searchParams.get("shelter");

  const [selectedShelter, setSelectedShelter] = useState<any>(null);
  const [requestedItems, setRequestedItems] = useState<Record<string, number>>({});
  const [donation, setDonation] = useState<Record<string, number>>({});
  const [showPopup, setShowPopup] = useState(false);

  // 1. Load the shelter data based on URL param
  useEffect(() => {
    if (shelterName) {
      fetch("/api/shelter")
        .then(res => res.json())
        .then((all: any[]) => {
          const found = all.find(s => s.name === shelterName);
          if (found) setSelectedShelter(found);
        });
    }
  }, [shelterName]);

  useEffect(() => {
  if (!selectedShelter) return;

  // assume req is Record<string, number>
  const rawReq: Record<string, number> = selectedShelter.req ?? {};

  // filter out zero values, then cast back to Record<string,number>
  const filtered = Object.fromEntries(
    Object.entries(rawReq).filter(([, amt]) => amt > 0)
  ) as Record<string, number>;

  setRequestedItems(filtered);

  const initDon = Object.keys(filtered).reduce<Record<string, number>>((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});
  setDonation(initDon);

}, [selectedShelter]);


  const handleConfirm = () => setShowPopup(true);

  const handleWindowSelect = (range: [number, number]) => {
    const [minDays, maxDays] = range;
    const now = new Date();
    const opening = new Date(now);
    opening.setDate(now.getDate() + minDays);
    const closing = new Date(now);
    closing.setDate(now.getDate() + maxDays);

    makeDonation(
      selectedShelter._id,
      donation,
      opening.toISOString().split('T')[0],
      closing.toISOString().split('T')[0]
    );
    router.push("/CommunityMember/profile");
  };

  return (
    <div className="flex-grow overflow-y-auto px-4 p-6 space-y-4 pb-16">
      <div className="w-full max-w-screen-sm mx-auto flex items-center space-x-2">
        <span className="font-semibold whitespace-nowrap">Shelter Name:</span>
        <ShelterSearch onSelect={s => setSelectedShelter(s)} />
      </div>

      <p><strong>Shelter:</strong> {selectedShelter?.name || "None selected"}</p>

      {selectedShelter && (
        <div className="space-y-6">
          <div>
            <p className="font-semibold">Supplies requested:</p>
            <ul className="list-disc list-inside">
              {Object.entries(requestedItems).map(([item, amt]) => (
                <li key={item}>{item} ({amt})</li>
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
                    setDonation(prev => ({
                      ...prev,
                      [item]: Math.max(0, prev[item] - 1),
                    }))
                  }>−</button>
                  <span>{donation[item]}</span>
                  <button onClick={() =>
                    setDonation(prev => ({
                      ...prev,
                      [item]: prev[item] + 1,
                    }))
                  }>+</button>
                </div>
              </div>
            ))}
          </div>

          <button
            className="bg-gray-300 py-2 w-full rounded mt-4"
            onClick={handleConfirm}
          >
            Confirm Donation
          </button>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 px-4">
          <div className="bg-yellow-400 border border-black rounded-xl shadow-xl w-full max-w-sm p-6 space-y-4 text-center">
            <h2 className="text-xl font-extrabold">Confirm Donation Request</h2>
            <p className="text-sm font-medium">
              When would you like<br/>to drop off your donations?
            </p>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '1 to 3 days', range: [1, 3] as [number, number] },
                { label: '4 to 7 days', range: [4, 7] as [number, number] },
                { label: '1 to 2 weeks', range: [7, 14] as [number, number] },
              ].map(btn => (
                <button
                  key={btn.label}
                  className="bg-gray-200 hover:bg-gray-300 font-medium py-2 px-2 rounded"
                  onClick={() => handleWindowSelect(btn.range)}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <button
              className="mt-4 bg-yellow-200 hover:bg-yellow-300 font-semibold py-2 px-4 rounded w-full"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
