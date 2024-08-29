import { createAppSlice } from "../../createAppSlice";
import {
  createAsset,
  deleteAsset,
  detailGuest,
  getDashbard,
  getList,
  updateAsset,
} from "./assetAPI";

const dummy_asset = [
  {
    uuid: "1",
    penggunaan: "pertanian",
    skpd: "Dinas Pertanian",
    kecamatan: "Ngemplak",
    desa: "Ngemplak",
    alamat: "Jl. Raya Ngemplak",
    leglitas: "Sertifikat",
    kasus: false,
    uraian_kasus: "",
    updatedAt: "2021-08-21",
  },
  {
    uuid: "2",
    penggunaan: "perumahan",
    skpd: "Dinas Perumahan dan Permukiman",
    kecamatan: "Depok",
    desa: "Caturharjo",
    alamat: "Jl. Kaliurang KM 7",
    leglitas: "SHM",
    kasus: true,
    uraian_kasus: "Sengketa lahan dengan warga",
    updatedAt: "2021-09-10",
  },
  {
    uuid: "3",
    penggunaan: "perdagangan",
    skpd: "Dinas Perdagangan",
    kecamatan: "Sleman",
    desa: "Tridadi",
    alamat: "Jl. Magelang KM 10",
    leglitas: "Sertifikat",
    kasus: false,
    uraian_kasus: "",
    updatedAt: "2021-10-05",
  },
  {
    uuid: "4",
    penggunaan: "industri",
    skpd: "Dinas Perindustrian",
    kecamatan: "Mlati",
    desa: "Tirtoadi",
    alamat: "Jl. Magelang KM 8",
    leglitas: "SHGB",
    kasus: false,
    uraian_kasus: "",
    updatedAt: "2021-11-15",
  },
  {
    uuid: "5",
    penggunaan: "pariwisata",
    skpd: "Dinas Pariwisata",
    kecamatan: "Pakem",
    desa: "Hargobinangun",
    alamat: "Jl. Kaliurang KM 20",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Tumpang tindih dengan lahan warga",
    updatedAt: "2022-01-12",
  },
  {
    uuid: "6",
    penggunaan: "kesehatan",
    skpd: "Dinas Kesehatan",
    kecamatan: "Gamping",
    desa: "Ambarketawang",
    alamat: "Jl. Wates KM 5",
    leglitas: "Sertifikat",
    kasus: false,
    uraian_kasus: "",
    updatedAt: "2022-03-07",
  },
  {
    uuid: "7",
    penggunaan: "pendidikan",
    skpd: "Dinas Pendidikan",
    kecamatan: "Godean",
    desa: "Sidokarto",
    alamat: "Jl. Godean KM 8",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Sengketa dengan pihak ketiga",
    updatedAt: "2022-04-18",
  },
  {
    uuid: "8",
    penggunaan: "perikanan",
    skpd: "Dinas Kelautan dan Perikanan",
    kecamatan: "Berbah",
    desa: "Kalitirto",
    alamat: "Jl. Berbah - Prambanan",
    leglitas: "SHM",
    kasus: false,
    uraian_kasus: "",
    updatedAt: "2022-05-23",
  },
  {
    uuid: "9",
    penggunaan: "kehutanan",
    skpd: "Dinas Kehutanan",
    kecamatan: "Tempel",
    desa: "Lumbungrejo",
    alamat: "Jl. Tempel - Turi",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Pelanggaran kawasan hutan lindung",
    updatedAt: "2022-07-14",
  },
  {
    uuid: "10",
    penggunaan: "transportasi",
    skpd: "Dinas Perhubungan",
    kecamatan: "Kalasan",
    desa: "Tirtomartani",
    alamat: "Jl. Solo KM 10",
    leglitas: "SHGB",
    kasus: false,
    uraian_kasus: "",
    updatedAt: "2022-08-29",
  },
  {
    uuid: "11",
    penggunaan: "pertambangan",
    skpd: "Dinas Energi dan Sumber Daya Mineral",
    kecamatan: "Prambanan",
    desa: "Bokoharjo",
    alamat: "Jl. Prambanan - Piyungan",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Izin tambang yang belum lengkap",
    updatedAt: "2022-09-17",
  },
  {
    uuid: "11",
    penggunaan: "pertambangan",
    skpd: "Dinas Energi dan Sumber Daya Mineral",
    kecamatan: "Prambanan",
    desa: "Bokoharjo",
    alamat: "Jl. Prambanan - Piyungan",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Izin tambang yang belum lengkap",
    updatedAt: "2022-09-17",
  },
  {
    uuid: "11",
    penggunaan: "pertambangan",
    skpd: "Dinas Energi dan Sumber Daya Mineral",
    kecamatan: "Prambanan",
    desa: "Bokoharjo",
    alamat: "Jl. Prambanan - Piyungan",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Izin tambang yang belum lengkap",
    updatedAt: "2022-09-17",
  },
  {
    uuid: "11",
    penggunaan: "pertambangan",
    skpd: "Dinas Energi dan Sumber Daya Mineral",
    kecamatan: "Prambanan",
    desa: "Bokoharjo",
    alamat: "Jl. Prambanan - Piyungan",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Izin tambang yang belum lengkap",
    updatedAt: "2022-09-17",
  },
  {
    uuid: "11",
    penggunaan: "pertambangan",
    skpd: "Dinas Energi dan Sumber Daya Mineral",
    kecamatan: "Prambanan",
    desa: "Bokoharjo",
    alamat: "Jl. Prambanan - Piyungan",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Izin tambang yang belum lengkap",
    updatedAt: "2022-09-17",
  },
  {
    uuid: "11",
    penggunaan: "pertambangan",
    skpd: "Dinas Energi dan Sumber Daya Mineral",
    kecamatan: "Prambanan",
    desa: "Bokoharjo",
    alamat: "Jl. Prambanan - Piyungan",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Izin tambang yang belum lengkap",
    updatedAt: "2022-09-17",
  },
  {
    uuid: "11",
    penggunaan: "pertambangan",
    skpd: "Dinas Energi dan Sumber Daya Mineral",
    kecamatan: "Prambanan",
    desa: "Bokoharjo",
    alamat: "Jl. Prambanan - Piyungan",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Izin tambang yang belum lengkap",
    updatedAt: "2022-09-17",
  },
  {
    uuid: "11",
    penggunaan: "pertambangan",
    skpd: "Dinas Energi dan Sumber Daya Mineral",
    kecamatan: "Prambanan",
    desa: "Bokoharjo",
    alamat: "Jl. Prambanan - Piyungan",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Izin tambang yang belum lengkap",
    updatedAt: "2022-09-17",
  },
  {
    uuid: "11",
    penggunaan: "pertambangan",
    skpd: "Dinas Energi dan Sumber Daya Mineral",
    kecamatan: "Prambanan",
    desa: "Bokoharjo",
    alamat: "Jl. Prambanan - Piyungan",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Izin tambang yang belum lengkap",
    updatedAt: "2022-09-17",
  },
  {
    uuid: "11",
    penggunaan: "pertambangan",
    skpd: "Dinas Energi dan Sumber Daya Mineral",
    kecamatan: "Prambanan",
    desa: "Bokoharjo",
    alamat: "Jl. Prambanan - Piyungan",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Izin tambang yang belum lengkap",
    updatedAt: "2022-09-17",
  },
  {
    uuid: "11",
    penggunaan: "pertambangan",
    skpd: "Dinas Energi dan Sumber Daya Mineral",
    kecamatan: "Prambanan",
    desa: "Bokoharjo",
    alamat: "Jl. Prambanan - Piyungan",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Izin tambang yang belum lengkap",
    updatedAt: "2022-09-17",
  },
  {
    uuid: "11",
    penggunaan: "pertambangan",
    skpd: "Dinas Energi dan Sumber Daya Mineral",
    kecamatan: "Prambanan",
    desa: "Bokoharjo",
    alamat: "Jl. Prambanan - Piyungan",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Izin tambang yang belum lengkap",
    updatedAt: "2022-09-17",
  },
  {
    uuid: "11",
    penggunaan: "pertambangan",
    skpd: "Dinas Energi dan Sumber Daya Mineral",
    kecamatan: "Prambanan",
    desa: "Bokoharjo",
    alamat: "Jl. Prambanan - Piyungan",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Izin tambang yang belum lengkap",
    updatedAt: "2022-09-17",
  },
  {
    uuid: "11",
    penggunaan: "pertambangan",
    skpd: "Dinas Energi dan Sumber Daya Mineral",
    kecamatan: "Prambanan",
    desa: "Bokoharjo",
    alamat: "Jl. Prambanan - Piyungan",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Izin tambang yang belum lengkap",
    updatedAt: "2022-09-17",
  },
  {
    uuid: "11",
    penggunaan: "pertambangan",
    skpd: "Dinas Energi dan Sumber Daya Mineral",
    kecamatan: "Prambanan",
    desa: "Bokoharjo",
    alamat: "Jl. Prambanan - Piyungan",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Izin tambang yang belum lengkap",
    updatedAt: "2022-09-17",
  },
  {
    uuid: "11",
    penggunaan: "pertambangan",
    skpd: "Dinas Energi dan Sumber Daya Mineral",
    kecamatan: "Prambanan",
    desa: "Bokoharjo",
    alamat: "Jl. Prambanan - Piyungan",
    leglitas: "Sertifikat",
    kasus: true,
    uraian_kasus: "Izin tambang yang belum lengkap",
    updatedAt: "2022-09-17",
  },
];

const initialState = {
  is_panel_hide: false,
  api_status: {
    get_asset_status: "idle",
    create_asset_status: "idle",
    update_asset_status: "idle",
    delete_asset_status: "idle",
    detailguest_asset_status: "idle",
    detailadmin_asset_status: "idle",
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
  dashboard: {
    asalUsul: [],
    legalitas: [],
    kategori: [],
    kasus: [],
    kecamatan: [],
    skpd: [],
  },
  mapPolygon: {
    source: "manual",
    coordinates: [],
  },
};

export const assetSlice = createAppSlice({
  name: "asset",
  initialState,
  reducers: (create) => ({
    setGuestPreviewAsync: create.asyncThunk(
      async (data) => {
        const response = await detailGuest(data);
        return response;
      },
      {
        pending: (state) => {
          state.previewAsset.status = "loading";
        },
        fulfilled: (state, action) => {
          state.previewAsset.status = "idle";
          state.previewAsset = action.payload.data;
        },
        rejected: (state) => {
          state.previewAsset.status = "failed";
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
          state.previewAsset.status = "loading";
        },
        fulfilled: (state, action) => {
          state.previewAsset.status = "idle";
          state.previewAsset = action.payload.data;
        },
        rejected: (state) => {
          state.previewAsset.status = "failed";
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
    hidePanel: create.reducer((state, action) => {
      state.is_panel_hide = action.payload;
    }),
    setMapPolygon: create.reducer((state, action) => {
      const { source = "manual", coordinates } = action.payload;
      state.mapPolygon = { source, coordinates };
    }),
    editMapPolygonLat: create.reducer((state, action) => {
      state.mapPolygon.coordinates[action.payload.index] = [
        action.payload.lat,
        state.mapPolygon.coordinates[action.payload.index][1],
      ];
    }),
    editMapPolygonLng: create.reducer((state, action) => {
      state.mapPolygon.coordinates[action.payload.index] = [
        state.mapPolygon.coordinates[action.payload.index][0],
        action.payload.lng,
      ];
    }),
    addOnePolygon: create.reducer((state, action) => {
      state.mapPolygon.coordinates.push(action.payload);
    }),
    deleteOnePolygon: create.reducer((state, action) => {
      state.mapPolygon.coordinates = state.mapPolygon.coordinates.filter(
        (p, i) => i !== action.payload
      );
    }),
  }),
  selectors: {
    selectPreviewAsset: (state) => state.previewAsset,
    selectAssets: (state) => state.assets,
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
    selectMapPolygon: (state) => state.mapPolygon,
  },
});

export const {
  createAssetAsync,
  deleteAssetAsync,
  setAdminPreviewAsync,
  setGuestPreviewAsync,
  setListAssetAsync,
  updateAssetAsync,
  getDashboardAsync,
  hidePanel,
  setMapPolygon,
  editMapPolygonLat,
  editMapPolygonLng,
  addOnePolygon,
  deleteOnePolygon,
} = assetSlice.actions;

export const {
  selectPreviewAsset,
  selectAssets,
  checkAssetLoading,
  selectDashboard,
  selectAssetSertifikat,
  selectAssetNonSertifikat,
  selectHidePanel,
  selectMapPolygon,
} = assetSlice.selectors;
