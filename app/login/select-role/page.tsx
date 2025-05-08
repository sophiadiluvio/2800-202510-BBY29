"use client";

import { useRouter } from "next/navigation";

export default function LoginRolePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* Header */}
      <div className="bg-green-600 px-4 py-2 flex justify-center">
        <h1 className="text-xl font-bold text-white">ShelterLink</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-grow space-y-6 mt-10 text-center">
        <h2 className="text-xl font-semibold">Log In as:</h2>

        <button
          className="bg-blue-500 text-white font-bold py-2 px-8 rounded"
          onClick={() => router.push("/login/organization")}
        >
          Organization
        </button>

        <button
          className="bg-yellow-400 text-black font-bold py-2 px-8 rounded"
          onClick={() => router.push("/login/member")}
        >
          Member
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-300 flex justify-around py-2 text-xl">
        <button>📍</button>
        <button>🏠</button>
        <button>➕</button>
      </div>
    </main>
  );
}
