'use client';

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/navbar/communityMember/header";
import Footer from "../../components/navbar/communityMember/footer";

export default function DonationConfirmPage() {
  const searchParams = useSearchParams();

  const [dropoff, setDropoff] = useState<string | null>(null);
  const shelterName = searchParams.get("shelter");
  const donation = searchParams.get("donation");
  const parsedDonation = donation ? JSON.parse(donation) : {};

  const handleFinalConfirm = () => {
    console.log("---- Donation Confirmed! ----");
    console.log("Shelter:", shelterName);
    console.log("Donation:", parsedDonation);
    console.log("Drop-off time:", dropoff);
    alert("Donation confirmed!");
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      
      <Header />

      {/* Card */}
      <div className="bg-yellow-400 m-auto p-6 rounded-md w-11/12 max-w-md text-center border border-black">
        <h2 className="text-xl font-bold">Donation Request<br />Sent</h2>
        <p className="mt-4 font-medium">When would you like<br />to drop off your donations?</p>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {["1 to 3 days", "4 to 7 days", "1 to 2 weeks"].map((option) => (
            <button
              key={option}
              className={`bg-gray-200 py-2 rounded ${
                dropoff === option ? "ring-2 ring-black" : ""
              }`}
              onClick={() => setDropoff(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={handleFinalConfirm}
          className="mt-6 bg-gray-200 text-black py-2 px-6 rounded"
        >
          Confirm
        </button>
      </div>
      
      <Footer />
    </main>
  );
}


