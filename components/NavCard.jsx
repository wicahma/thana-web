"use client";
import {
  Bars3Icon,
  ChartPieIcon,
  CircleStackIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useState } from "react";

const NavCard = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="flex gap-3 shadow-md rounded-xl border border-gray-200 items-center duration-300 relative z-[1000] bg-white py-1 pe-1 ps-2 hover:bg-gray-100">
      <Link href="/" className="px-3 cursor-pointer transition-colors hover:bg-gray-200 rounded-md py-1">
        <p className="text-base">Phantox</p>
      </Link>
      <div
        onClick={() => setShowNav(!showNav)}
        className="w-9 bg-white hover:bg-gray-300 border rounded-lg p-2"
      >
        <Bars3Icon className="w-full aspect-auto" />
      </div>
      <div
        className={`${
          showNav ? "block" : "hidden"
        } w-48 mt-1 overflow-hidden absolute rounded-lg bg-white transition-colors border text-gray-800 border-gray-200 top-full right-0 shadow-lg`}
      >
        <Link
          href={"/dashboard"}
          className="flex gap-1 h-8 items-center text-base hover:bg-gray-200 duration-300"
        >
          <ChartPieIcon className="h-full aspect-auto p-2" />
          <p>Dashboard</p>
        </Link>
        <Link
          href={"/data"}
          className="flex gap-1 h-8 items-center text-base hover:bg-gray-200 duration-300"
        >
          <CircleStackIcon className="h-full aspect-auto p-2" />
          <p>Data</p>
        </Link>
        <Link
          href={"/user"}
          className="flex gap-1 h-8 items-center text-base hover:bg-gray-200 duration-300"
        >
          <UserIcon className="h-full aspect-auto p-2" />
          <p>User</p>
        </Link>
      </div>
    </div>
  );
};

export default NavCard;
