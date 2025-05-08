"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrganizationStatusPage() {
  const router = useRouter();
  const [animateBars, setAnimateBars] = useState(false);

  const resourceStatus = {
    cannedGoods: 126,
    water: 320,
    clothing: 54,
    blankets: 14,
  };

  useEffect(() => {
    setTimeout(() => setAnimateBars(true), 100);
  }, []);

  const max = 320;

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 flex items-center justify-between px-4 py-2 text-white">
        <button onClick={() => router.back()}>←</button>
        <h1 className="text-xl font-bold">Current Status</h1>
        <button>👤</button>
      </div>

      {/* Resource Bars */}
      <div className="grid grid-cols-2 gap-4 px-6 mt-6">
        {Object.entries(resourceStatus).map(([label, amount]) => {
          const percentage = Math.min(amount / max, 1);

          const color =
            percentage >= 0.66
              ? "bg-green-500"
              : percentage >= 0.33
              ? "bg-yellow-400"
              : "bg-red-500";

          return (
            <div
              key={label}
              className="bg-gray-200 rounded flex flex-col items-center py-4"
            >
              {/* Bar Container */}
              <div className="w-full px-4 h-40 relative">
                <div className="h-full bg-white rounded border overflow-hidden relative">
                  {/* Colored fill */}
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

              {/* Label below */}
              <div className="mt-2 text-sm capitalize text-center">
                {label.replace(/([A-Z])/g, " $1")}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 px-6 space-y-3">
        <button
          className="bg-gray-300 w-full py-2 rounded"
          onClick={() => router.push("/organization/update")}
        >
          Item Update
        </button>
        <button
          className="bg-gray-300 w-full py-2 rounded"
          onClick={() => router.push("/organization/resources")}
        >
          Resource Request
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-400 flex justify-around py-2 text-xl">
        <button>📍</button>
        <button>🏠</button>
        <button>➕</button>
      </div>
    </main>
  );
}
