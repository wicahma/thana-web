import { UserIcon } from "@heroicons/react/24/solid";
import React from "react";

const User = () => {
  return (
    <div className="fixed z-[1000] text-base w-screen h-screen top-0 flex justify-end left-0">
      <div
        className={`bg-white rounded-xl max-w-[30%] m-2 shadow-lg w-full relative overflow-hidden transition-all duration-500`}
      >
        <div className="flex gap-3 p-3 items-center border-b border-b-gray-200">
          <div className="w-11 aspect-square border rounded-lg p-2">
            <UserIcon className="w-full aspect-auto" />
          </div>
          <div className="flex flex-col">
            <p className="text-lg">User</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>
        <div className="">

        </div>
      </div>
    </div>
  );
};

export default User;
