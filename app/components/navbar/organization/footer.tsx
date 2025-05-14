// app/components/navbar/NavBar.tsx

"use client";

import Link from "next/link";
import { Home, MapPin, PlusCircle } from "lucide-react";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-300 py-2 px-6 flex justify-around items-center border-t border-gray-400 z-50">
      <Link href="/">
        <div className="flex flex-col items-center">
          <MapPin size={24} />
        </div>
      </Link>

      <Link href="/Organization/profile">
        <div className="flex flex-col items-center">
          <Home size={24} />
        </div>
      </Link>

      <Link href="/Organization/resources">
        <div className="flex flex-col items-center">
          <PlusCircle size={24} />
        </div>
      </Link>
    </div>
  );
}
