"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MemberRegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* Header */}
      <div className="bg-green-600 flex items-center justify-between px-4 py-2">
        <button onClick={() => router.back()}>←</button>
        <h1 className="text-xl font-bold text-white">ShelterLink</h1>
        <div style={{ width: "24px" }} />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-grow space-y-4 mt-10 text-center">
        <h2 className="text-lg font-semibold text-yellow-500">Member Registration</h2>

        <input
          type="text"
          placeholder="User Name"
          className="bg-gray-200 text-center py-2 px-4 w-64 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="bg-gray-200 text-center py-2 px-4 w-64 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="bg-gray-200 text-center py-2 px-4 w-64 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-gray-200 py-2 px-8 rounded"
          onClick={() => alert("Member registered!")}
        >
          Sign up
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-300 flex justify-center py-2">
        <button>🏠</button>
      </div>
    </main>
  );
}
