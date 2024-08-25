import { createAppSlice } from "../../createAppSlice";

const initialState = {
  loginData: {
    name: "",
    email: "",
    user_type: "",
    uuid: "",
    email_verified: false,
    status: "idle",
    profile_picture: "",
    username: "",
    phone_number: "",
  },
};

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    // incrementByAmount: create.reducer(
    //   (state, action: PayloadAction<number>) => {
    //     state.value += action.payload;
    //   }
    // ),

    clearLogin: create.reducer((state) => {
      state.loginData = {
        name: "",
        email: "",
        user_type: "",
        uuid: "",
        email_verified: false,
        status: "idle",
        profile_picture: "",
        username: "",
        phone_number: "",
      };
    }),

    getProfileAsync: create.asyncThunk(
      async () => {
        const token = localStorage.getItem("token");
        const response = await getProfile(token ?? "");
        return response;
      },
      {
        pending: (state) => {
          state.loginData.status = "loading";
        },
        fulfilled: (state, action) => {
          if (action.payload.code === 200) {
            state.loginData = {
              name: action.payload.data.name,
              email: action.payload.data.email,
              user_type: action.payload.data.user_type,
              uuid: action.payload.data.uuid,
              email_verified: action.payload.data.email_verified,
              profile_picture: action.payload.data.profile_picture,
              username: action.payload.data.username,
              phone_number: action.payload.data.phone_number,
              status: "idle",
            };
          }
        },
        rejected: (state) => {
          state.loginData.status = "failed";
        },
      }
    ),

    loginAsync: create.asyncThunk(
      async ({ email, pass }) => {
        const response = await login(email, pass);
        return response;
      },
      {
        pending: (state) => {
          state.loginData.status = "loading";
        },
        fulfilled: (state, action) => {
          state.loginData.status = "idle";
          if (action.payload.code === 200) {
            state.loginData = {
              name: action.payload.data.name,
              email: action.payload.data.email,
              user_type: action.payload.data.user_type,
              uuid: action.payload.data.uuid,
              email_verified: action.payload.data.email_verified,
              profile_picture: action.payload.data.profile_picture,
              username: action.payload.data.username,
              phone_number: action.payload.data.phone_number,
              status: "idle",
            };
            localStorage.setItem("token", action.payload.tokens.access.token);
            localStorage.setItem(
              "refreshToken",
              action.payload.tokens.refresh.token
            );
          }
        },
        rejected: (state) => {
          state.loginData.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectLogin: (counter) => counter.loginData,
  },
});

export const { loginAsync, getProfileAsync, clearLogin } = authSlice.actions;

export const { selectLogin } = authSlice.selectors;
