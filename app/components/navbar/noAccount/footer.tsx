"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-300 py-2 px-6 flex justify-around items-center border-t border-gray-400 z-50">
      <Link href="/">
        <div className="flex flex-col items-center">
          <Home size={24} />
        </div>
      </Link>
    </div>
  );
}
