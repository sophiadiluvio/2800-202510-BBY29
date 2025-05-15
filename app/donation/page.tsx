// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Header from "../components/navbar/communityMember/header";
// import Footer from "../components/navbar/communityMember/footer";
// import SearchBar form "../components/navbar/communityMember/searchBar" //

// export default function DonationPage() {
//   const router = useRouter();

//   const [donation, setDonation] = useState({
//     cannedGoods: 0,
//     waterBottles: 0,
//     clothing: 0,
//     blankets: 0,
//   });

//   const increment = (item: keyof typeof donation) => {
//     setDonation((prev) => ({ ...prev, [item]: prev[item] + 1 }));
//   };

//   const decrement = (item: keyof typeof donation) => {
//     setDonation((prev) => ({
//       ...prev,
//       [item]: Math.max(0, prev[item] - 1),
//     }));
//   };

//   return (
//     <main className="min-h-screen bg-white text-black font-sans flex flex-col">

//       <Header>
//         <h1 className="text-xl font-bold ml-4">Donation</h1>
//       </Header>

//       {/* Content */}
//       <div className="p-6 space-y-4">
//         <p><strong>Shelter Name:</strong></p>

//         <p><strong>Supplies requested:</strong></p>
//         <ul className="list-disc list-inside">
//           <li>Blankets</li>
//           <li>Water bottles</li>
//           <li>Canned food</li>
//         </ul>
        
//         {/* Donation Box */}
//         <div className="bg-gray-200 p-4 rounded space-y-4">
//           <p className="font-bold text-center">What would you like to donate?</p>

//           {[
//             ["Canned goods", "cannedGoods"],
//             ["Water bottles", "waterBottles"],
//             ["Clothing", "clothing"],
//             ["Blankets", "blankets"],
//           ].map(([label, key]) => (
//             <div key={key} className="flex justify-between items-center">
//               <span>{label}</span>
//               <div className="flex items-center space-x-2">
//                 <button onClick={() => decrement(key as keyof typeof donation)}>-</button>
//                 <span>{donation[key as keyof typeof donation]}</span>
//                 <button onClick={() => increment(key as keyof typeof donation)}>+</button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <button
//           className="bg-gray-300 py-2 w-full rounded"
//           onClick={() => alert("Donation request submitted!")}
//         >
//           Confirm Donation
//         </button>
//       </div>

//       <Footer />
//     </main>
//   );
// }


'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/navbar/communityMember/header";
import Footer from "../components/navbar/communityMember/footer";
import ShelterSearch from "../components/searchbar"; // 기존 searchbar 컴포넌트

export default function DonationPage() {
  const router = useRouter();

  const [selectedShelter, setSelectedShelter] = useState<any>(null);
  const [requestedItems, setRequestedItems] = useState<Record<string, number>>({});
  const [donation, setDonation] = useState<Record<string, number>>({});

  // 쉘터 선택 시 요청 항목과 기부 항목 초기화
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

  // const increment = (item: string) => {
  //   setDonation((prev) => ({ ...prev, [item]: prev[item] + 1 }));
  // };

  // const decrement = (item: string) => {
  //   setDonation((prev) => ({
  //     ...prev,
  //     [item]: Math.max(0, prev[item] - 1),
  //   }));
  // };

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
        {/* ✅ 한 줄에 "Shelter Name:" + SearchBar */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-semibold text-black whitespace-nowrap">Shelter Name:</span>
          <div className="flex-1">
            <ShelterSearch onSelect={(shelter) => setSelectedShelter(shelter)} />
          </div>
        </div>

        {/* ✅ 선택된 쉘터 표시 */}
        <p><strong>Shelter:</strong> {selectedShelter?.name || "None selected"}</p>


        {selectedShelter && (
  <div className="space-y-6">
    {/* 📦 Supplies requested 리스트 */}
    <div>
      <p className="font-semibold">Supplies requested:</p>
      <ul className="list-disc list-inside">
        {Object.entries(requestedItems).map(([item, amount]) => (
          <li key={item}>{item} ({amount})</li>
        ))}
      </ul>
    </div>

    {/* 🎁 Donation 수량 선택 박스 */}
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

        {/* ✅ Confirm 버튼 */}
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


