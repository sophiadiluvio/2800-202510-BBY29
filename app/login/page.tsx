"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/navbar/noAccount/header";
import Footer from "../components/navbar/noAccount/footer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
     
      <Header>
          <h1 className="text-xl font-bold">ShelterLink</h1>
      </Header>

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
          className="bg-blue-500 text-white py-2 px-8 rounded hover:bg-blue-600 transition"
        >
          Log in
        </button>
        </form>

        <button
          type="button"
          onClick={() => router.push("/register")}
          className="bg-green-600 text-white py-2 px-8 rounded mt-2 hover:bg-green-600 transition"
        >
          Create an account
        </button>

      </div>

      <Footer />
    </main>
  );
}
