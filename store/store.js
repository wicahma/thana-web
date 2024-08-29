import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { assetSlice } from "./features/asset/assetSlice";
import { kecamatanSlice } from "./features/kecamatan/kecamatanSlice";
import { skpdSlice } from "./features/skpd/skpdSlice";

const rootReducer = combineSlices(
  authSlice,
  assetSlice,
  kecamatanSlice,
  skpdSlice
);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
