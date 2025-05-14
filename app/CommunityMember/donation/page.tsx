"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/navbar/communityMember/header";
import Footer from "../../components/navbar/communityMember/footer";

export default function DonationPage() {
  const router = useRouter();

  const [donation, setDonation] = useState({
    cannedGoods: 0,
    waterBottles: 0,
    clothing: 0,
    blankets: 0,
  });

  const increment = (item: keyof typeof donation) => {
    setDonation((prev) => ({ ...prev, [item]: prev[item] + 1 }));
  };

  const decrement = (item: keyof typeof donation) => {
    setDonation((prev) => ({
      ...prev,
      [item]: Math.max(0, prev[item] - 1),
    }));
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">

      <Header>
        <h1 className="text-xl font-bold ml-4">Donation</h1>
      </Header>

      {/* Content */}
      <div className="p-6 space-y-4">
        <p><strong>Shelter Name:</strong></p>

        <p><strong>Supplies requested:</strong></p>
        <ul className="list-disc list-inside">
          <li>Blankets</li>
          <li>Water bottles</li>
          <li>Canned food</li>
        </ul>

        {/* Donation Box */}
        <div className="bg-gray-200 p-4 rounded space-y-4">
          <p className="font-bold text-center">What would you like to donate?</p>

          {[
            ["Canned goods", "cannedGoods"],
            ["Water bottles", "waterBottles"],
            ["Clothing", "clothing"],
            ["Blankets", "blankets"],
          ].map(([label, key]) => (
            <div key={key} className="flex justify-between items-center">
              <span>{label}</span>
              <div className="flex items-center space-x-2">
                <button onClick={() => decrement(key as keyof typeof donation)}>-</button>
                <span>{donation[key as keyof typeof donation]}</span>
                <button onClick={() => increment(key as keyof typeof donation)}>+</button>
              </div>
            </div>
          ))}
        </div>

        <button
          className="bg-gray-300 py-2 w-full rounded"
          onClick={() => alert("Donation request submitted!")}
        >
          Confirm Donation
        </button>
      </div>

      <Footer />
    </main>
  );
}
