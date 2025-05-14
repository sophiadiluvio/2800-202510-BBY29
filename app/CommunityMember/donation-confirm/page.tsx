"use client";

import { useState } from "react";
import Header from "../../components/navbar/communityMember/header";
import Footer from "../../components/navbar/communityMember/footer";

export default function DonationConfirmPage() {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      
      <Header/>

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
      
      <Footer />
    </main>
  );
}
