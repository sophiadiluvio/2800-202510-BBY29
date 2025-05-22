'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { BsQuestionSquareFill } from "react-icons/bs";
import Image from 'next/image';


export default function Header({ children }: { children?: ReactNode }) {
  const router = useRouter();

  return (
    <div className="bg-green-500 text-black p-4 flex justify-between items-center relative z-10">

      <button onClick={() => router.push('/info')} className="w-8 h-8 flex items-center justify-center">
        <BsQuestionSquareFill size={24} />
      </button>

            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-xl font-bold">
              <Image
                src="/logo_transparent.png"
                alt="ShelterLink Logo"
                width={25}
                height={25}
              />
              <span className="font-bold text-xl font-sans">{children || 'ShelterLink'}</span>
            </div>

      <button
        onClick={() => router.push('/login')}
        className="bg-white text-black px-4 py-1 rounded-md font-medium hover:bg-gray-100 transition"
      >
        Login
      </button>
    </div>
  );
}
