
'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { CgProfile } from "react-icons/cg";

export default function Header({ children }: { children?: ReactNode }) {
  const router = useRouter();

  return (
    <div className="bg-yellow-500 text-black p-4 flex justify-between items-center relative z-10">
      {/* Left spacer*/}
      <div className="w-8 h-8" />

      {/* Centered title */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
        {'ShelterLink'}
      </div>

      {/* Profile icon */}
      <button
        onClick={() => router.push('/CommunityMember/profile')}
        className="bg-white rounded-full w-8 h-8 flex items-center justify-center"
      ><CgProfile size={40} />
        <span className="text-lg"></span>
      </button>
    </div>
  );
}
