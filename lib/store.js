import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { learnerSlice } from "./features/learner/learnerSlice";
import { mentorSlice } from "./features/mentor/mentorSlice";

const rootReducer = combineSlices(authSlice, learnerSlice, mentorSlice);

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
