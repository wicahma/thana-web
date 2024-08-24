import Image from "next/image";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import LoginCard from "../components/LoginCard";
import NavCard from "../components/NavCard";
export default function Home() {
  return (
    <main className="fixed z-[1100] p-3 w-screen flex justify-between top-0 left-0 h-fit transition-colors">
      <div className="text-base h-full flex gap-2">
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
      {false ? <LoginCard /> : <NavCard />}
    </main>
  );
}
