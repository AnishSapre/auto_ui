"use client";

import { SiDart } from "react-icons/si";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 text-white p-2 flex justify-between items-center shadow-md">
      <Link href="/match-type" className="flex items-center hover:text-blue-300 transition-colors">
        <SiDart className="text-2xl mr-2 text-blue-400" />
        <h1 className="text-xl font-bold">Auto UI</h1>
      </Link>

      <div className="flex items-center">
        {session?.user && (
          <div className="flex items-center mr-4">
            <span className="mr-3 text-sm hidden md:inline">
              {session.user.name || session.user.email}
            </span>
            {session.user.image && (
              <img
                src={session.user.image}
                alt="User Profile"
                className="w-8 h-8 rounded-full border border-blue-400"
              />
            )}
          </div>
        )}

        {session ? (
          <button
            onClick={() => signOut()}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            Sign Out
          </button>
        ) : (
          <Link 
            href="/api/auth/signin" 
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;