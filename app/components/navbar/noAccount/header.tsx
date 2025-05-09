"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

export default function Header({ children }: { children?: ReactNode }) {
  const router = useRouter();

  return (
    <div className="bg-green-600 px-4 py-2 relative flex items-center text-black">
      <button onClick={() => router.back()} className="absolute left-4">
        <ArrowLeft size={28} />
      </button>
      <div className="w-full text-center">{children}</div>
    </div>
  );
}