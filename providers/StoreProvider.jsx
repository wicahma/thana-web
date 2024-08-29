"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../store/store";
import { setupListeners } from "@reduxjs/toolkit/query";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
