import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

const LoginCard = () => {
  return (
    <Link
      href={"/login"}
      className="flex shadow-md gap-3 rounded-xl border border-gray-200 items-center duration-300 relative z-[1000] bg-white py-1 pe-1 ps-3 hover:bg-gray-100"
    >
      <p className="text-base mx-3">Login</p>
      <div className="w-9 border rounded-lg p-2">
        <UserIcon className="w-full aspect-auto" />
      </div>
    </Link>
  );
};

export default LoginCard;
