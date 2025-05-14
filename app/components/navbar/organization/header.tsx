"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { ArrowLeft, UserCircle } from "lucide-react";

export default function Header({ children }: { children?: ReactNode }) {
  const router = useRouter();

  return (
    <div className="bg-blue-600 px-4 py-2 flex items-center text-black">
      <button onClick={() => router.back()} >
        <ArrowLeft size={28} />
      </button>
      <div className="flex-1">{children}</div>
  
      <button onClick={() => router.push("/Organization/profile")}>
        <UserCircle size={28} />
      </button>
    </div>
  );
}