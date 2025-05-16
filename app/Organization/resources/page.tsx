"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/navbar/organization/header";
import Footer from "../../components/navbar/organization/footer";

export default function ResourceRequestPage() {
  const router = useRouter();

  const [resources, setResources] = useState({
    cannedGoods: 3,
    waterBottles: 3,
    clothing: 3,
    blankets: 3,
    volunteers: 3,
  });

  const increment = (item: keyof typeof resources) => {
    setResources((prev) => ({ ...prev, [item]: prev[item] + 1 }));
  };

  const decrement = (item: keyof typeof resources) => {
    setResources((prev) => ({
      ...prev,
      [item]: Math.max(0, prev[item] - 1),
    }));
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      
      <Header>
        <h1 className="text-xl font-bold ml-4">Resource Request</h1>
      </Header>

      {/* Form */}
      <div className="p-6 space-y-4">
        <div className="bg-gray-200 p-4 rounded space-y-4">
          {[
            ["Canned goods", "cannedGoods"],
            ["Water bottles", "waterBottles"],
            ["Clothing", "clothing"],
            ["Blankets", "blankets"],
            ["Volunteers", "volunteers"],
          ].map(([label, key]) => (
            <div key={key} className="flex justify-between items-center">
              <span>{label}</span>
              <div className="flex items-center space-x-2">
                <button onClick={() => decrement(key as keyof typeof resources)}>-</button>
                <span>{resources[key as keyof typeof resources]}</span>
                <button onClick={() => increment(key as keyof typeof resources)}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Confirm Button */}
        <button
          className="bg-gray-300 py-2 w-full rounded font-semibold"
          onClick={() => alert("Resource request submitted!")}
        >
          Confirm Request
        </button>
      </div>
     <Footer />
    </main>
  );
}
