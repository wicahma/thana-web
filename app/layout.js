"use client";
import { useEffect, useState } from "react";
import Map from "../components/map";
import "./globals.css";
import SideCardDetail from "../components/SideCardDetail";
import StoreProvider from "./StoreProvider";

export default function RootLayout({ children, params }) {
  const [pos, setPos] = useState([-7.8381006, 110.3879432]);

  useEffect(() => {
    console.log("Ini paramnya", params);
  }, [params]);

  return (
    <StoreProvider>
      <html lang="id">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Phantox Negara</title>
        </head>
        <body>
          <div className="relative">
            <SideCardDetail />
          </div>
          <div className="h-full w-full">{children}</div>
          <Map />
        </body>
      </html>
    </StoreProvider>
  );
}
