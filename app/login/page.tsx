"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* Header */}
      <div className="bg-green-600 px-4 py-2 flex justify-center">
        <h1 className="text-xl font-bold text-white">ShelterLink</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-grow space-y-4 mt-10 text-center">
        <h2 className="text-green-500 text-lg font-semibold"><br />Log In</h2>

        <form action='/api/login' method='POST' className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="bg-gray-200 text-center py-2 px-4 w-64 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="bg-gray-200 text-center py-2 px-4 w-64 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-gray-200 py-2 px-8 rounded"
        >
          Log in
        </button>
        </form>
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
