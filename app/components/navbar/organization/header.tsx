"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { CgProfile } from "react-icons/cg";

export default function Header({ children }: { children?: ReactNode }) {
  const router = useRouter();

  return (
    <div className="bg-blue-500 text-black p-4 flex justify-between items-center relative z-10">
      {/*Back Button*/}
      <button onClick={() => router.back()} className="z-10">
        <ArrowLeft size={28} />
      </button>

       {/* Centered title or children */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
        {children || 'ShelterLink'}
      </div>

      {/*Profile Icon*/}
      <button
        onClick={() => router.push("/Organization/profile")}
        className="z-10"
      >
        <CgProfile size={40} />
      </button>
    </div>
  );
}
