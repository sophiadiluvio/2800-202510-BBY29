
'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { CgProfile } from "react-icons/cg";
import Image from 'next/image';


export default function Header({ children }: { children?: ReactNode }) {
  const router = useRouter();

  return (
    <div className="bg-yellow-500 text-black p-4 flex justify-between items-center relative z-10">
      {/* Left spacer*/}
      <div className="w-8 h-8" />

      {/* Centered title or children */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-xl font-bold">
              <Image
                src="/logo_transparent.png"
                alt="ShelterLink Logo"
                width={25}
                height={25}
              />
              <span className="font-bold text-xl font-sans">{children || 'ShelterLink'}</span>
            </div>

      {/* Profile icon */}
      <button
        onClick={() => router.push('/CommunityMember/profile')}
        className="z-10"
      ><CgProfile size={40} />
        <span className="text-lg"></span>
      </button>
    </div>
  );
}
