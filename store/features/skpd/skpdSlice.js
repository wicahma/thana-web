import { createAppSlice } from "../../createAppSlice";
import { createSkpd, deleteSkpd, getList, updateSkpd } from "./skpdAPI";
export const skpdInitState = {
  skpd_data: [],
  api_status: {
    list_skpd_status: "idle",
    create_skpd_status: "idle",
    update_skpd_status: "idle",
    delete_skpd_status: "idle",
  },
};

export const skpdSlice = createAppSlice({
  name: "skpd",
  initialState: skpdInitState,
  reducers: (create) => ({
    clearSkpd: create.reducer((state) => {
      state.skpd_data = skpdInitState.skpd_data;
    }),

    getListSkpdAsync: create.asyncThunk(
      async () => {
        const response = await getList();
        return response;
      },
      {
        pending: (state) => {
          state.api_status.list_skpd_status = "loading";
        },
        fulfilled: (state, action) => {
          state.api_status.list_skpd_status = "idle";
          state.skpd_data = action.payload.data;
        },
        rejected: (state) => {
          state.api_status.list_skpd_status = "failed";
        },
      }
    ),

    createSkpdAsync: create.asyncThunk(
      async (data) => {
        const response = await createSkpd(data);
        return response;
      },
      {
        pending: (state) => {
          state.api_status.create_skpd_status = "loading";
        },
        fulfilled: (state) => {
          state.api_status.create_skpd_status = "idle";
        },
        rejected: (state) => {
          state.api_status.create_skpd_status = "failed";
        },
      }
    ),

    updateSkpdAsync: create.asyncThunk(
      async (data) => {
        const response = await updateSkpd(data);
        return response;
      },
      {
        pending: (state) => {
          state.api_status.update_skpd_status = "loading";
        },
        fulfilled: (state) => {
          state.api_status.update_skpd_status = "idle";
        },
        rejected: (state) => {
          state.api_status.update_skpd_status = "failed";
        },
      }
    ),

    deleteSkpdAsync: create.asyncThunk(
      async (uuid) => {
        const response = await deleteSkpd(uuid);
        return response;
      },
      {
        pending: (state) => {
          state.api_status.delete_skpd_status = "loading";
        },
        fulfilled: (state) => {
          state.api_status.delete_skpd_status = "idle";
        },
        rejected: (state) => {
          state.api_status.delete_skpd_status = "failed";
        },
      }
    ),
  }),
  selectors: {
    checkSkpdLoading: (state) => state.api_status,
    selectSkpdData: (state) => state.skpd_data,
  },
});

export const {
  clearSkpd,
  getListSkpdAsync,
  createSkpdAsync,
  updateSkpdAsync,
  deleteSkpdAsync,
} = skpdSlice.actions;

export const { checkSkpdLoading, selectSkpdData } = skpdSlice.selectors;
