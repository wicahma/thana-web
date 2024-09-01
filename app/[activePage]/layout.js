"use client";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "../globals.css";
import { useEffect } from "react";
import {
  checkToken,
  selectLogin,
  selectToken,
} from "../../store/features/auth/authSlice";

export default function NavLayout({
  children,
  dashboard,
  data,
  login,
  user,
  params,
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { type } = useAppSelector(selectLogin);
  const { access } = useAppSelector(selectToken);
  const path = usePathname();

  useEffect(() => {
    if (type !== "guest" || access) {
      dispatch(checkToken()).then((checkLogin) => {
        console.log("ini di nav layout", checkLogin);
        if (!checkLogin.payload.status) {
          router.replace("/login");
        }
      });
    }
  }, [path]);

  

  return (
    <>
      <div className="h-full w-full">
        {children}
        <div>{params.activePage === "dashboard" && dashboard}</div>
        <div>{params.activePage === "data" && data}</div>
        <div>{params.activePage === "login" && login}</div>
        <div>{params.activePage === "user" && user}</div>
      </div>
    </>
  );
}
