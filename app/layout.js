"use client";
import { useState } from "react";
import Map from "../components/map";
import "./globals.css";

export default function RootLayout({ children, dashboard, data, login, user }) {
  const [pos, setPos] = useState([-7.8381006, 110.3879432]);
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Phantox Negara</title>
      </head>
      <body>
        <div className="h-full w-full">
          {children}
          {/* <div>{dashboard}</div> */}
          <div>{data}</div>
          {/* <div>{login}</div> */}
          {/* <div>{user}</div>{" "} */}
        </div>
        <Map />
      </body>
    </html>
  );
}
