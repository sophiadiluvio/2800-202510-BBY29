"use client";

import { useState } from "react";

export default function DonationConfirmPage() {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* Header */}
      <div className="bg-yellow-400 flex items-center justify-between px-4 py-2">
        <button>{"←"}</button>
        <h1 className="text-xl font-bold"> </h1>
        <button>👤</button>
      </div>

      {/* Card */}
      <div className="bg-yellow-400 m-auto p-6 rounded-md w-11/12 max-w-md text-center border border-black">
        <h2 className="text-xl font-bold">Donation Request<br />Sent</h2>
        <p className="mt-4 font-medium">When would you like<br />to drop off your donations?</p>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {["1 to 3 days", "4 to 7 days", "1 to 2 weeks"].map((option) => (
            <button
              key={option}
              className={`bg-gray-200 py-2 rounded ${
                selectedOption === option ? "ring-2 ring-black" : ""
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <button className="mt-6 bg-gray-200 py-2 px-6 rounded">Confirm</button>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-300 flex justify-around py-2">
        <button>🏠</button>
        <button>🤍</button>
        <button>🤝</button>
      </div>
    </main>
  );
}
