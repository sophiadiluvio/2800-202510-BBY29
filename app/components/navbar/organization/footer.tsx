"use client";

import Link from "next/link";
import { Home, MapPin, PlusCircle } from "lucide-react";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-500 py-3 px-6 flex justify-around items-center border-t border-gray-400 z-50">
      <Link href="/Organization/map">
        <div className="flex flex-col items-center">
          <MapPin size={30} />
        </div>
      </Link>

      <Link href="/Organization">
        <div className="flex flex-col items-center">
          <Home size={30} />
        </div>
      </Link>

      <Link href="/Organization/update">
        <div className="flex flex-col items-center">
          <PlusCircle size={30} />
        </div>
      </Link>
    </div>
  );
}
