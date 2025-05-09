"use client";

import { useRouter } from "next/navigation";
import Header from "../components/navbar/noAccount/header";
import Footer from "../components/navbar/noAccount/footer";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">

      <Header>
        <h1 className="text-xl font-bold">ShelterLink</h1>
      </Header>

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

      <Footer />
    </main>
  );
}
