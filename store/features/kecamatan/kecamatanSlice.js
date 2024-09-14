import { createAppSlice } from "../../createAppSlice";
import { getList } from "./kecamatanAPI";
export const kecamatanInitState = {
  api_status: {
    list_kecamatan_status: "idle",
    create_kecamatan_status: "idle",
    update_kecamatan_status: "idle",
    delete_kecamatan_status: "idle",
  },
  kecamatan_data: [],
};

export const kecamatanSlice = createAppSlice({
  name: "kecamatan",
  initialState: kecamatanInitState,
  reducers: (create) => ({
    clearKecamatan: create.reducer((state) => {
      state.kecamatan_data = kecamatanInitState.kecamatan_data;
    }),

    getListKecAsync: create.asyncThunk(
      async () => {
        const response = await getList();
        return response;
      },
      {
        pending: (state) => {
          state.api_status.list_kecamatan_status = "loading";
        },
        fulfilled: (state, action) => {
          state.api_status.list_kecamatan_status = "idle";
          state.kecamatan_data = action.payload.data;
        },
        rejected: (state) => {
          state.api_status.list_kecamatan_status = "failed";
        },
      }
    ),

    createKecAsync: create.asyncThunk(
      async (data) => {
        const response = await createKecamatan(data);
        return response;
      },
      {
        pending: (state) => {
          state.api_status.create_kecamatan_status = "loading";
        },
        fulfilled: (state) => {
          state.api_status.create_kecamatan_status = "idle";
        },
        rejected: (state) => {
          state.api_status.create_kecamatan_status = "failed";
        },
      }
    ),

    updateKecAsync: create.asyncThunk(
      async (data) => {
        const response = await updateKecamatan(data);
        return response;
      },
      {
        pending: (state) => {
          state.api_status.update_kecamatan_status = "loading";
        },
        fulfilled: (state) => {
          state.api_status.update_kecamatan_status = "idle";
        },
        rejected: (state) => {
          state.api_status.update_kecamatan_status = "failed";
        },
      }
    ),

    deleteKecAsync: create.asyncThunk(
      async (uuid) => {
        const response = await deleteKecamatan(uuid);
        return response;
      },
      {
        pending: (state) => {
          state.api_status.delete_kecamatan_status = "loading";
        },
        fulfilled: (state) => {
          state.api_status.delete_kecamatan_status = "idle";
        },
        rejected: (state) => {
          state.api_status.delete_kecamatan_status = "failed";
        },
      }
    ),
  }),
  selectors: {
    checkKecamatanLoading: (state) => state.api_status,
    selectKecamatan: (state) => state.kecamatan_data,
  },
});

export const {
  clearKecamatan,
  createKecAsync,
  deleteKecAsync,
  getListKecAsync,
  updateKecAsync,
} = kecamatanSlice.actions;

export const { checkKecamatanLoading, selectKecamatan } =
  kecamatanSlice.selectors;
