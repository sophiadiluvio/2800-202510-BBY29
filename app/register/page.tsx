"use client";

import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* Header */}
      <div className="bg-green-600 flex items-center justify-between px-4 py-2">
        <button onClick={() => router.back()}>←</button>
        <h1 className="text-xl font-bold text-white">ShelterLink</h1>
        <div style={{ width: "24px" }} /> {/* Empty space to balance layout */}
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-grow text-center space-y-6">
        <h2 className="text-xl font-semibold mt-10">Register as:</h2>

        <button
          className="bg-blue-500 text-white font-bold py-2 px-8 rounded"
          onClick={() => router.push("/register/organization")}
        >
          Organization
        </button>

        <button
          className="bg-yellow-400 text-black font-bold py-2 px-8 rounded"
          onClick={() => router.push("/register/member")}
        >
          Member
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-300 flex justify-center py-2">
        <button>🏠</button>
      </div>
    </main>
  );
}
