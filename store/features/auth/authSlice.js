import { createAppSlice } from "../../createAppSlice";
import { getProfile, login, logout } from "./authAPI";

const initialState = {
  api_status: {
    login_status: "idle",
    logout_status: "idle",
    check_token_status: "idle",
  },
  login_data: {
    name: "",
    email: "",
    email_verified: false,
    type: "guest",
    updatedAt: "",
    createdAt: "",
  },
  token: {
    access: typeof window !== "undefined" && localStorage.getItem("access"),
    refresh: typeof window !== "undefined" && localStorage.getItem("refresh"),
  },
};

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    clearLogin: create.reducer((state) => {
      state.login_data = initialState.login_data;
    }),

    checkToken: create.asyncThunk(
      async () => {
        const refresh = localStorage.getItem("refresh");
        console.log("REFRESH TOKEN + ", refresh);
        let response = false;
        response = await getProfile(refresh);
        return response;
      },
      {
        pending: (state) => {
          state.api_status.check_token_status = "loading";
        },
        fulfilled: (state, action) => {
          state.api_status.check_token_status = "idle";
          console.log("FULFILLED ACTION CHECKTOKEN ++ ", action.payload);
          if (action.payload.status === false) {
            console.log("TOKEN REMOVED");
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
          } else {
            console.log("SETTING NEW DATA");
            state.login_data = {
              name: action.payload.data.user.name,
              email: action.payload.data.user.email,
              type: action.payload.data.user.type,
              createdAt: action.payload.data.user.createdAt,
              updatedAt: action.payload.data.user.updatedAt,
            };
            state.token.access = action.payload.data.tokens.access.token;
            state.token.refresh = action.payload.data.tokens.refresh.token;
            localStorage.setItem(
              "access",
              action.payload.data.tokens.access.token
            );
            localStorage.setItem(
              "refresh",
              action.payload.data.tokens.refresh.token
            );
          }
        },
        rejected: (state) => {
          state.api_status.check_token_status = "failed";
        },
      }
    ),

    loginAsync: create.asyncThunk(
      async ({ email, pass }) => {
        console.log("LOGIN ASYNC + ", email, pass);
        const response = await login(email, pass);
        return response;
      },
      {
        pending: (state) => {
          state.api_status.login_status = "loading";
        },
        fulfilled: (state, action) => {
          state.api_status.login_status = "idle";
          console.log("FULFILLED ACTION LOGIN ++ ");
          console.log(action.type);
          console.log(action.payload);
          if (action.payload.code === 200) {
            state.login_data = {
              name: action.payload.data.name,
              email: action.payload.data.email,
              type: action.payload.data.type,
              email_verified: action.payload.data.email_verified,
              createdAt: action.payload.data.createdAt,
              updatedAt: action.payload.data.updatedAt,
            };
            state.token.access = action.payload.tokens.access.token;
            state.token.refresh = action.payload.tokens.refresh.token;
            localStorage.setItem("access", action.payload.tokens.access.token);
            localStorage.setItem(
              "refresh",
              action.payload.tokens.refresh.token
            );
          }
        },
        rejected: (state) => {
          state.login_data.status = "failed";
        },
      }
    ),

    logoutAsync: create.asyncThunk(
      async () => {
        const refresh = localStorage.getItem("refresh");
        const access = localStorage.getItem("access");
        const response = await logout(access, refresh);
        return response;
      },
      {
        pending: (state) => {
          state.api_status.logout_status = "loading";
        },
        fulfilled: (state) => {
          state.login_data = initialState.login_data;
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
        },
        rejected: (state) => {
          state.api_status.logout_status.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectLogin: (counter) => counter.login_data,
    checkAuthLoading: (counter) => counter.api_status,
    selectToken: (counter) => counter.token,
  },
});

export const { loginAsync, clearLogin, logoutAsync, checkToken } =
  authSlice.actions;

export const { selectLogin, checkAuthLoading, selectToken } =
  authSlice.selectors;
