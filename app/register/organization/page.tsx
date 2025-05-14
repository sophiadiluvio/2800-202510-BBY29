"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/navbar/noAccount/header";
import Footer from "../../components/navbar/noAccount/footer";

export default function OrgRegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = 'organizer';

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      <Header>
          <h1 className="text-xl font-bold">ShelterLink</h1>
      </Header>

      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-grow space-y-4 mt-10 text-center">
        <h2 className="text-lg font-semibold text-blue-600">Organization Registration</h2>

        <form action='/api/register' method='POST' className="flex flex-col gap-4">
          {/* hidden field so FormData.get('role') === 'organizer' */}
          <input type="hidden" name="role" value={role} />

          <input
            name="name"
            type="text"
            placeholder="User Name"
            className="bg-gray-200 text-center py-2 px-4 w-64 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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
            Sign up
          </button>
        </form>
      </div>

      <Footer />
    </main>
  );
}
