import { createAppSlice } from "../../createAppSlice";
import {
  bulkCreateAsset,
  createAsset,
  deleteAsset,
  detailAdmin,
  detailGuest,
  getAll,
  getDashbard,
  getList,
  updateAsset,
} from "./assetAPI";

export const assetInitState = {
  is_panel_hide: false,
  api_status: {
    get_asset_status: "idle",
    get_all_asset_status: "idle",
    create_asset_status: "idle",
    update_asset_status: "idle",
    delete_asset_status: "idle",
    detailguest_asset_status: "idle",
    detailadmin_asset_status: "idle",
    create_bulk_asset_status: "idle",
    edit_asset_status: "idle",
    set_preview_asset_admin_status: "idle",
    set_preview_asset_guest_status: "idle",
  },
  editAsset: {
    penggunaan: "",
    no_kib: "",
    uraian: "",
    tanggal_perolehan: "",
    luas: 0,
    alamat: "",
    legalitas: "",
    tanggal_legalitas: "",
    nomor_legalitas: "",
    asal_usul: "",
    harga: 0,
    keterangan: "",
    kategori: "",
    desa: "",
    kasus: false,
    uraian_kasus: "",
    pemanfaatan: false,
    keterangan_lainnya: "",
    foto_1: "",
    foto_2: "",
    koordinats: "",
    kecamatan_id: 0,
    skpd_id: 0,
    createdAt: "",
    updatedAt: "",
  },
  previewAsset: {
    penggunaan: "",
    no_kib: "",
    uraian: "",
    tanggal_perolehan: "",
    luas: 0,
    alamat: "",
    legalitas: "",
    tanggal_legalitas: "",
    nomor_legalitas: "",
    asal_usul: "",
    harga: 0,
    keterangan: "",
    kategori: "",
    desa: "",
    kasus: false,
    uraian_kasus: "",
    pemanfaatan: false,
    keterangan_lainnya: "",
    foto_1: "",
    foto_2: "",
    koordinats: "",
    kecamatan_id: 0,
    skpd_id: 0,
    createdAt: "",
    updatedAt: "",
  },
  assets: [],
  allAssets: [],
  dashboard: {
    asalUsul: [],
    legalitas: [],
    kategori: [],
    kasus: [],
    kecamatan: [],
    skpd: [],
  },
  mapPolygonCreate: {
    source: "manual",
    coordinates: [[0, 0]],
  },
  mapPolygonUpdate: {
    source: "manual",
    coordinates: [[0, 0]],
  },
};

export const assetSlice = createAppSlice({
  name: "asset",
  initialState: assetInitState,
  reducers: (create) => ({
    resetPreviewAsset: create.reducer((state) => {
      state.previewAsset = assetInitState.previewAsset;
    }),

    setGuestPreviewAsync: create.asyncThunk(
      async (data) => {
        const response = await detailGuest(data);
        return response;
      },
      {
        pending: (state) => {
          state.api_status.set_preview_asset_guest_status = "loading";
        },
        fulfilled: (state, action) => {
          state.api_status.set_preview_asset_guest_status = "idle";
          state.previewAsset = action.payload.data[0];
        },
        rejected: (state) => {
          state.api_status.set_preview_asset_guest_status = "failed";
        },
      }
    ),
    setAdminPreviewAsync: create.asyncThunk(
      async (data) => {
        const response = await detailAdmin(data);
        return response;
      },
      {
        pending: (state) => {
          state.api_status.set_preview_asset_admin_status = "loading";
        },
        fulfilled: (state, action) => {
          state.api_status.set_preview_asset_admin_status = "idle";
          state.previewAsset = action.payload.data[0];
        },
        rejected: (state) => {
          state.api_status.set_preview_asset_admin_status = "failed";
        },
      }
    ),
    setAdminDetailUpdateAsync: create.asyncThunk(
      async (data) => {
        const response = await detailAdmin(data);
        return response;
      },
      {
        pending: (state) => {
          state.api_status.edit_asset_status = "loading";
        },
        fulfilled: (state, action) => {
          state.api_status.edit_asset_status = "idle";
          state.editAsset = action.payload.data[0];
        },
        rejected: (state) => {
          state.api_status.edit_asset_status = "failed";
        },
      }
    ),
    setListAssetAsync: create.asyncThunk(
      async () => {
        const response = await getList();
        return response;
      },
      {
        pending: (state) => {
          state.api_status.get_asset_status = "loading";
        },
        fulfilled: (state, action) => {
          state.api_status.get_asset_status = "idle";
          state.assets = action.payload.data;
        },
        rejected: (state) => {
          state.api_status.get_asset_status = "failed";
        },
      }
    ),
    setAllAssetAsync: create.asyncThunk(
      async () => {
        const response = await getAll();
        return response;
      },
      {
        pending: (state) => {
          state.api_status.get_all_asset_status = "loading";
        },
        fulfilled: (state, action) => {
          state.api_status.get_all_asset_status = "idle";
          state.allAssets = action.payload.data;
        },
        rejected: (state) => {
          state.api_status.get_all_asset_status = "failed";
        },
      }
    ),
    getDashboardAsync: create.asyncThunk(
      async () => {
        const response = await getDashbard();
        return response;
      },
      {
        pending: (state) => {
          state.api_status.get_asset_status = "loading";
        },
        fulfilled: (state, action) => {
          state.api_status.get_asset_status = "idle";
          state.dashboard = action.payload.data;
        },
        rejected: (state) => {
          state.api_status.get_asset_status = "failed";
        },
      }
    ),
    createAssetAsync: create.asyncThunk(
      async (data) => {
        const response = await createAsset(data);
        return response;
      },
      {
        pending: (state) => {
          state.api_status.create_asset_status = "loading";
        },
        fulfilled: (state) => {
          state.api_status.create_asset_status = "idle";
        },
        rejected: (state) => {
          state.api_status.create_asset_status = "failed";
        },
      }
    ),

    createBulkAsset: create.asyncThunk(
      async ({ data, type }) => {
        const response = await bulkCreateAsset(data, type);
        return response;
      },
      {
        pending: (state) => {
          state.api_status.create_bulk_asset_status = "loading";
        },
        fulfilled: (state) => {
          state.api_status.create_bulk_asset_status = "idle";
        },
        rejected: (state) => {
          state.api_status.create_bulk_asset_status = "failed";
        },
      }
    ),

    updateAssetAsync: create.asyncThunk(
      async (data) => {
        const response = await updateAsset(data);
        return response;
      },
      {
        pending: (state) => {
          state.api_status.update_asset_status = "loading";
        },
        fulfilled: (state) => {
          state.api_status.update_asset_status = "idle";
        },
        rejected: (state) => {
          state.api_status.update_asset_status = "failed";
        },
      }
    ),

    deleteAssetAsync: create.asyncThunk(
      async (uuid) => {
        const response = await deleteAsset(uuid);
        return response;
      },
      {
        pending: (state) => {
          state.api_status.delete_asset_status = "loading";
        },
        fulfilled: (state) => {
          state.api_status.delete_asset_status = "idle";
        },
        rejected: (state) => {
          state.api_status.delete_asset_status = "failed";
        },
      }
    ),
    setEditAsset: create.reducer((state, action) => {
      if (action.payload.isReset === true) {
        state.editAsset = assetInitState.editAsset;
        return;
      }
      state.editAsset = action.payload.data;
    }),
    hidePanel: create.reducer((state, action) => {
      state.is_panel_hide = action.payload;
    }),
    setMapPolygonCreate: create.reducer((state, action) => {
      const { source = "manual", coordinates } = action.payload;
      state.mapPolygonCreate = { source, coordinates };
    }),
    editMapPolygonLatCreate: create.reducer((state, action) => {
      state.mapPolygonCreate.coordinates[action.payload.index] = [
        action.payload.lat,
        state.mapPolygonCreate.coordinates[action.payload.index][1],
      ];
    }),
    editMapPolygonLngCreate: create.reducer((state, action) => {
      state.mapPolygonCreate.coordinates[action.payload.index] = [
        state.mapPolygonCreate.coordinates[action.payload.index][0],
        action.payload.lng,
      ];
    }),
    addOnePolygonCreate: create.reducer((state, action) => {
      state.mapPolygonCreate.coordinates.push(action.payload);
    }),
    deleteOnePolygonCreate: create.reducer((state, action) => {
      state.mapPolygonCreate.coordinates =
        state.mapPolygonCreate.coordinates.filter(
          (p, i) => i !== action.payload
        );
    }),
    setMapPolygonUpdate: create.reducer((state, action) => {
      const { source = "manual", coordinates } = action.payload;
      state.mapPolygonUpdate = { source, coordinates };
    }),
    editMapPolygonLatUpdate: create.reducer((state, action) => {
      state.mapPolygonUpdate.coordinates[action.payload.index] = [
        action.payload.lat,
        state.mapPolygonUpdate.coordinates[action.payload.index][1],
      ];
    }),
    editMapPolygonLngUpdate: create.reducer((state, action) => {
      state.mapPolygonUpdate.coordinates[action.payload.index] = [
        state.mapPolygonUpdate.coordinates[action.payload.index][0],
        action.payload.lng,
      ];
    }),
    addOnePolygonUpdate: create.reducer((state, action) => {
      state.mapPolygonUpdate.coordinates.push(action.payload);
    }),
    deleteOnePolygonUpdate: create.reducer((state, action) => {
      state.mapPolygonUpdate.coordinates =
        state.mapPolygonUpdate.coordinates.filter(
          (p, i) => i !== action.payload
        );
    }),
  }),
  selectors: {
    selectPreviewAsset: (state) => state.previewAsset,
    selectAssets: (state) => state.assets,
    selectAllAssets: (state) => state.allAssets,
    checkAssetLoading: (state) => state.api_status,
    selectDashboard: (state) => state.dashboard,
    selectAssetSertifikat: (state) =>
      state.dashboard.legalitas.filter(
        (asset) => asset.legalitas === "sertifikat"
      ),
    selectAssetNonSertifikat: (state) =>
      state.dashboard.legalitas.filter(
        (asset) => asset.legalitas !== "sertifikat"
      ),
    selectHidePanel: (state) => state.is_panel_hide,
    selectMapPolygonCreate: (state) => state.mapPolygonCreate,
    selectMapPolygonUpdate: (state) => state.mapPolygonUpdate,
    selectEditAsset: (state) => state.editAsset,
  },
});

export const {
  createAssetAsync,
  deleteAssetAsync,
  setAdminPreviewAsync,
  setGuestPreviewAsync,
  setAdminDetailUpdateAsync,
  setListAssetAsync,
  updateAssetAsync,
  getDashboardAsync,
  hidePanel,
  setMapPolygonCreate,
  editMapPolygonLatCreate,
  editMapPolygonLngCreate,
  addOnePolygonCreate,
  createBulkAsset,
  deleteOnePolygonCreate,
  setMapPolygonUpdate,
  editMapPolygonLatUpdate,
  editMapPolygonLngUpdate,
  addOnePolygonUpdate,
  createBulUpdate,
  deleteOnePolygonUpdate,
  setAllAssetAsync,
  resetPreviewAsset,
  setEditAsset,
} = assetSlice.actions;

export const {
  selectPreviewAsset,
  selectAssets,
  checkAssetLoading,
  selectDashboard,
  selectAssetSertifikat,
  selectAssetNonSertifikat,
  selectHidePanel,
  selectMapPolygonCreate,
  selectMapPolygonUpdate,
  selectAllAssets,
  selectEditAsset,
} = assetSlice.selectors;
