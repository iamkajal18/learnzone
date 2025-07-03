'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <div className="flex items-center space-x-3">
        <Image src="/logo.svg" width={40} height={40} alt="logo" />
        <span className="text-xl font-semibold text-primary">Logoipsum</span>
      </div>

      <ul className="flex gap-6 text-gray-700 font-medium">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/questions">Questions</Link></li>
        <li><Link href="/upgrade">Upgrade</Link></li>
        <li><Link href="/how-it-works">How it Works?</Link></li>
      </ul>

     
    </div>
  );
};

export default Header;
