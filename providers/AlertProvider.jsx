"use client";
import React from "react";
import { Alert } from "../components/Alert";

const AlertProvider = ({ children }) => {
  return (
    <div>
      <div className="fixed top-16 start-3 z-[5000]">
        <Alert />
      </div>
      {children}
    </div>
  );
};

export default AlertProvider;
