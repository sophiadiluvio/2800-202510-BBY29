"use client";

import Link from "next/link";
import { Home, HandHeart, Heart } from "lucide-react";


export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-500 py-3 px-6 flex justify-around items-center border-t border-gray-400 z-50">
      <Link href="/CommunityMember">
        <div className="flex flex-col items-center">
          <Home size={30} />
        </div>
      </Link>

       <Link href="//whatever the donations page is">
        <div className="flex flex-col items-center">
          <Heart size={30} />
        </div>
      </Link>

      <Link href="/CommunityMember/requested-donations">
        <div className="flex flex-col items-center">
          <HandHeart size={30} />
        </div>
      </Link>
    </div>
  );
}