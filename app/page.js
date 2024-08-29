"use client";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import LoginCard from "../components/LoginCard";
import NavCard from "../components/NavCard";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "../store/hooks";
import { selectLogin } from "../store/features/auth/authSlice";

export default function Home() {
  const { type } = useAppSelector(selectLogin);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const path = usePathname();
  useEffect(() => {
    if (type === "admin" || type === "superadmin") {
      setIsLogin(true);
    }
  }, [type]);
  return (
    <main className="fixed z-[1100] p-3 w-screen h-fit top-0 left-0 transition-colors text-gray-900">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="text-base flex gap-2">
            <div className="border border-gray-200 rounded-lg bg-white shadow-md overflow-hidden items-center w-full flex gap-1">
              <input
                className="h-full px-3 py-2"
                type="text"
                placeholder="Cari Lokasi / Nama Tanah"
              />
              <div className=" w-9 p-2 flex items-center justify-center duration-300 h-full aspect-square border-s border-s-gray-200 hover:bg-gray-100">
                <MagnifyingGlassIcon className="aspect-auto w-full" />
              </div>
            </div>
            <div className="bg-white rounded-lg aspect-square h-full p-2 border shadow-md border-gray-200">
              <AdjustmentsHorizontalIcon className="aspect-auto h-6" />
            </div>
          </div>
        </div>
        <div className="h-fit">{isLogin ? <NavCard /> : <LoginCard />}</div>
      </div>
    </main>
  );
}
