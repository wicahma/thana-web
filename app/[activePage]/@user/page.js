"use client";
import { UserIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  logoutAsync,
  selectLogin,
} from "../../../store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { dateTimeFormatter } from "../../../utils/formatter";

const User = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userData = useAppSelector(selectLogin);
  const handleLogout = () => {
    console.log("dia jalan kah");
    dispatch(logoutAsync()).then(() => router.replace("/"));
  };
  return (
    <div className="fixed z-[1000] text-base w-screen h-screen top-0 flex justify-end left-0">
      <div
        className={`bg-white rounded-xl max-w-[30%] m-2 shadow-lg w-full h-full relative overflow-hidden transition-all duration-500`}
      >
        <div className="flex gap-3 p-3 items-center border-b border-b-gray-200">
          <div className="w-11 aspect-square border rounded-lg p-2">
            <UserIcon className="w-full aspect-auto" />
          </div>
          <div className="flex flex-col">
            <p className="text-lg">{userData.name || "User"}</p>
            <p className="text-sm text-gray-500">
              {userData.type.toLocaleUpperCase()}
            </p>
          </div>
        </div>
        <div className="p-2 flex flex-col h-full">
          <div className="">
            <h2 className="text-lg font-semibold">Admin Data</h2>
            <p>{userData.email}</p>
            <p>
              {userData.updatedAt !== ""
                ? dateTimeFormatter(userData.updatedAt)
                : ""}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 self-end py-1 rounded-lg bg-red-500 hover:bg-red-600 transition-colors text-white text-sm font-medium"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
