import { Form, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { DropdownInput, MainInput, RadioInput, TextAreaInput } from ".";
import {
  BookmarkSquareIcon,
  MapPinIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addOnePolygonUpdate,
  deleteOnePolygonUpdate,
  editMapPolygonLatUpdate,
  editMapPolygonLngUpdate,
  selectEditAsset,
  selectMapPolygonUpdate,
  setMapPolygonUpdate,
} from "../../store/features/asset/assetSlice";
import { selectSkpdData } from "../../store/features/skpd/skpdSlice";
import { selectKecamatan } from "../../store/features/kecamatan/kecamatanSlice";
import { selectLogin } from "../../store/features/auth/authSlice";
import {
  asalUsulType,
  kasusType,
  kategoriType,
  legalitasType,
  pemanfaatanType,
  uraianKasusType,
} from "../../helper/constant";

const FormUpdateAsset = ({ hidePanelCallback, fileError, setFileError }) => {
  const { errors, values, setFieldValue } = useFormikContext();
  const { type: user_type } = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();
  const mapPolygon = useAppSelector(selectMapPolygonUpdate);
  const skpd = useAppSelector(selectSkpdData);
  const kecamatan = useAppSelector(selectKecamatan);
  const assetData = useAppSelector(selectEditAsset);
  const handleDeletePoly = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(setMapPolygonUpdate({ source: "manual", coordinates: [] }));
  };

  const handleAddManualPoly = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addOnePolygonUpdate([0, 0]));
  };

  const handleDeletePairCoord = (e, ind) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deleteOnePolygonUpdate(ind));
  };

  useEffect(() => {
    Object.keys(assetData).map((key) => {
      setFieldValue(key, assetData[key] === null ? "" : assetData[key]);
    });
  }, [assetData]);

  return (
    <div className="p-3 space-y-2">
      <h3 className="text-base font-semibold">Informasi Umum</h3>
      <MainInput
        name="Penggunaan"
        className="w-full"
        value={values.penggunaan}
        placeholder={"Masukkan Tujuan Penggunaan"}
        setValue={(e) => setFieldValue("penggunaan", e)}
        error={errors.penggunaan}
      />
      <div className="flex gap-3">
        <DropdownInput
          name="SKPD"
          className="w-full"
          displayValues={skpd.map((val) => val.nama)}
          keyValues={skpd.map((val) => val.id)}
          value={skpd.find((val) => val.id === values.skpd_id)?.nama}
          setValue={(e) => setFieldValue("skpd_id", e)}
          error={errors.skpd_id}
        />
        <MainInput
          name="No. KIB"
          value={values.no_kib}
          placeholder={"Masukkan No. KIB"}
          className="w-full"
          setValue={(e) => setFieldValue("no_kib", e)}
          error={errors.no_kib}
        />
      </div>
      <div className="flex gap-3">
        <MainInput
          name="Kode Barang"
          placeholder={"Masukkan Kode Barang"}
          className="w-full"
          setValue={(e) => setFieldValue("kode_barang", e)}
          value={values.kode_barang}
          error={errors.kode_barang}
        />
        <MainInput
          name="Uraian"
          placeholder={"Berikan uraian singkat"}
          className="w-full"
          setValue={(e) => setFieldValue("uraian", e)}
          value={values.uraian}
          error={errors.uraian}
        />
      </div>
      <div className="flex gap-3">
        <MainInput
          name="Tgl Perolehan"
          placeholder={"Masukkan Tanggal"}
          className="w-full"
          type="date"
          setValue={(e) => setFieldValue("tanggal_perolehan", e)}
          value={values.tanggal_perolehan}
          error={errors.tanggal_perolehan}
        />
        <MainInput
          name="Luas"
          placeholder={"Masukkan Luas"}
          className="w-full"
          setValue={(e) => setFieldValue("luas", e)}
          value={values.luas}
          error={errors.luas}
        />
      </div>
      <MainInput
        name="Alamat"
        placeholder={"Masukkan Alamat"}
        className="w-full"
        setValue={(e) => setFieldValue("alamat", e)}
        value={values.alamat}
        error={errors.alamat}
      />
      <div className="flex gap-3">
        <DropdownInput
          name="Asal Usul"
          displayValues={asalUsulType}
          keyValues={asalUsulType}
          className="w-full"
          setValue={(e) => setFieldValue("asal_usul", e)}
          value={values.asal_usul}
          error={errors.asal_usul}
        />
        <MainInput
          name="Harga"
          placeholder={"Masukkan Luas"}
          className="w-full"
          setValue={(e) => setFieldValue("harga", e)}
          value={values.harga}
          error={errors.harga}
        />
      </div>
      <div className="flex gap-3">
        <MainInput
          name="Desa"
          placeholder={"Masukkan Desa"}
          className="w-full"
          setValue={(e) => setFieldValue("desa", e)}
          value={values.desa}
          error={errors.desa}
        />
        <DropdownInput
          name="Kecamatan"
          displayValues={kecamatan.map((val) => val.nama)}
          keyValues={kecamatan.map((val) => val.id)}
          className="w-full"
          setValue={(e) => setFieldValue("kecamatan_id", e)}
          value={kecamatan.find((val) => val.id === values.kecamatan_id)?.nama}
          error={errors.kecamatan_id}
          extraOption={
            <div className="ps-1 mb-5">
              <MainInput
                name="Cari"
                className="w-full"
                setValue={(e) => console.log(e)}
              />
            </div>
          }
        />
      </div>
      <MainInput
        name="Keterangan"
        placeholder={"Berikan Keterangan"}
        className="w-full"
        setValue={(e) => setFieldValue("keterangan", e)}
        value={values.keterangan}
        error={errors.keterangan}
      />
      <div
        className={`rounded-lg p-2 ${
          user_type === "admin" ? "text-gray-400 bg-gray-200" : " bg-white"
        }  space-y-2`}
      >
        {user_type === "admin" && (
          <p className="text-red-500 text-sm my-1">
            * Hanya bisa diisi oleh Superadmin
          </p>
        )}
        <h3
          className={`text-base font-semibold ${
            user_type === "admin" ? "pt-0" : "pt-5"
          }`}
        >
          Legalitas
        </h3>
        <div className="flex gap-3">
          <DropdownInput
            disabled={user_type === "admin"}
            name="Legalitas"
            displayValues={legalitasType}
            keyValues={legalitasType}
            value={values.legalitas}
            className="w-full"
            setValue={(e) => setFieldValue("legalitas", e)}
            error={errors.legalitas}
          />
          <MainInput
            disabled={user_type === "admin"}
            name="Tgl Legalitas"
            className="w-full"
            type="date"
            setValue={(e) => setFieldValue("tanggal_legalitas", e)}
            value={values.tanggal_legalitas}
            error={errors.tanggal_legalitas}
          />
        </div>
        <div className="flex gap-3">
          <MainInput
            disabled={user_type === "admin"}
            name="No. Legalitas"
            placeholder={"Masukkan No. Legalitas"}
            className="w-full"
            setValue={(e) => setFieldValue("nomor_legalitas", e)}
            value={values.nomor_legalitas}
            error={errors.nomor_legalitas}
          />
          <MainInput
            disabled={user_type === "admin"}
            name="PDF Legalitas"
            accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            error={fileError.pdf_legalitas}
            placeholder={"PDF Legalitas"}
            className="w-full"
            type="file"
            setValue={(e) => {
              const data = e.target.files[0];
              if (data) {
                if (
                  (data.type.includes("pdf") ||
                    data.type.includes("msword") ||
                    data.type.includes(
                      "vnd.openxmlformats-officedocument.wordprocessingml.document"
                    )) &&
                  data.size <= 5_000_000
                ) {
                  setFileError({
                    pdf: "",
                  });
                  return setFieldValue("pdf_legalitas", data);
                }
                e.target.files = null;
                e.target.value = "";
                setFileError({
                  pdf: "Pdf wajib diisi, berjenis dokumen & kurang dari 5mb",
                });
                return setFieldValue("pdf_legalitas", undefined);
              }
            }}
          />
        </div>
      </div>

      <h3 className="text-base font-semibold pt-5">Status dan Penggunaan</h3>
      <DropdownInput
        name="Kategori"
        displayValues={kategoriType}
        keyValues={kategoriType}
        value={values.kategori}
        error={errors.kategori}
        className="w-full"
        setValue={(e) => setFieldValue("kategori", e)}
      />
      <div className="flex gap-3">
        <RadioInput
          name="Kasus"
          displayValues={kasusType}
          keyValues={[true, false]}
          setValue={(e) => setFieldValue("kasus", e)}
          value={values.kasus}
          error={errors.kasus}
        />
        <RadioInput
          name="Pemanfaatan"
          displayValues={pemanfaatanType}
          keyValues={[true, false]}
          setValue={(e) => setFieldValue("pemanfaatan", e)}
          value={values.pemanfaatan}
          error={errors.pemanfaatan}
        />
        <TextAreaInput
          name="Keterangan lainnya"
          placeholder={"Masukkan Penggunaan"}
          className="w-full"
          setValue={(e) => setFieldValue("keterangan_lainnya", e)}
          value={values.keterangan_lainnya}
          error={errors.keterangan_lainnya}
        />
      </div>
      <DropdownInput
        name="Uraian Kasus"
        displayValues={uraianKasusType}
        keyValues={uraianKasusType}
        value={values.uraian_kasus}
        error={errors.uraian_kasus}
        className="w-full"
        setValue={(e) => setFieldValue("uraian_kasus", e)}
      />
      <h3 className="text-base font-semibold pt-5">Dokumentasi</h3>
      <div className="flex gap-3">
        <MainInput
          name="Foto 1"
          type="file"
          accept="image/*"
          error={fileError.foto1}
          placeholder={"Masukkan Foto 1"}
          className="w-full"
          setValue={(e) => {
            const data = e.target.files[0];
            if (data) {
              if (data.type.includes("image") && data.size <= 5_000_000) {
                setFileError({
                  foto1: "",
                });
                return setFieldValue("foto_1", data);
              }
              e.target.files = null;
              e.target.value = "";
              setFileError({
                foto1: "Foto 1 wajib diisi, berjenis gambar & kurang dari 5mb",
              });
              return setFieldValue("foto_1", undefined);
            }
          }}
        />
        <MainInput
          name="Foto 2"
          type="file"
          accept="image/*"
          error={fileError.foto2}
          placeholder={"Masukkan Foto 2"}
          className="w-full"
          setValue={(e) => {
            const data = e.target.files[0];
            if (data) {
              if (data.type.includes("image") && data.size <= 5_000_000) {
                setFileError({
                  foto2: "",
                });
                return setFieldValue("foto_2", data);
              }
              e.target.files = null;
              e.target.value = "";
              setFileError({
                foto2: "Foto 2 wajib diisi, berjenis gambar & kurang dari 5mb",
              });
              return setFieldValue("foto_2", undefined);
            }
          }}
        />
      </div>
      <div className="flex gap-3 items-center pt-5">
        <h3 className="text-base font-semibold">Koordinat</h3>
        <div className="flex gap-2 bg-gray-100 ps-1 border border-gray-200 pe-2 py-1 rounded-xl items-center">
          <div
            onClick={hidePanelCallback}
            className="bg-sky-500 flex justify-center items-center gap-1 w-fit transition-colors hover:bg-sky-600 rounded-lg px-3 py-1 text-sm font-normal cursor-pointer text-white"
          >
            <MapPinIcon className="h-4 aspect-auto" />
            <p>Pilih dari peta</p>
          </div>
          <div
            onClick={handleDeletePoly}
            className="bg-red-100 text-red-600 flex justify-center items-center gap-1 w-fit transition-colors hover:bg-red-200 rounded-lg px-3 py-1 text-sm font-normal cursor-pointer"
          >
            <TrashIcon className="h-4 aspect-auto" />
            <p>Hapus Polygon</p>
          </div>
          <p className="text-sm text-gray-600">type: {mapPolygon.source}</p>
        </div>
      </div>
      <div className="space-y-3">
        {mapPolygon.source === "manual"
          ? mapPolygon.coordinates.map((val, i) => (
              <div key={i} className="flex gap-3">
                <MainInput
                  name="Latitude"
                  placeholder={"Masukkan Latitude"}
                  className="w-full"
                  type="number"
                  value={val[0]}
                  setValue={(e) => {
                    dispatch(editMapPolygonLatUpdate({ index: i, lat: e }));
                  }}
                />
                <MainInput
                  name="Longitude"
                  placeholder={"Masukkan Longitude"}
                  className="w-full"
                  type="number"
                  value={val[1]}
                  setValue={(e) => {
                    dispatch(editMapPolygonLngUpdate({ index: i, lng: e }));
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => handleDeletePairCoord(e, i)}
                  className="aspect-square p-2 bg-red-500 rounded-lg h-9 text-red-100 transition-colors hover:bg-red-600 hover:text-red-200"
                >
                  <TrashIcon className="h-full aspect-auto" />
                </button>
              </div>
            ))
          : mapPolygon.coordinates.map((val, i) => (
              <div key={i} className="flex gap-3">
                <MainInput
                  name="Latitude"
                  placeholder={"Masukkan Latitude"}
                  className="w-full"
                  value={val[0]}
                  disabled={true}
                  setValue={(e) => {
                    dispatch(editMapPolygonLatUpdate({ index: i, lat: e }));
                  }}
                />
                <MainInput
                  name="Longitude"
                  placeholder={"Masukkan Longitude"}
                  className="w-full"
                  value={val[1]}
                  disabled={true}
                  setValue={(e) => {
                    dispatch(editMapPolygonLngUpdate({ index: i, lng: e }));
                  }}
                />
              </div>
            ))}
        <button
          onClick={handleAddManualPoly}
          type="button"
          disabled={mapPolygon.source !== "manual"}
          className="flex hover:bg-gray-400 hover:text-white disabled:bg-gray-300 disabled:text-gray-400 disabled:border-gray-400 transition-colors rounded-lg items-center justify-center gap-3 h-10 border text-gray-400 border-gray-400 border-dashed w-full"
        >
          <PlusIcon className="aspect-auto h-full " />
          <p>Tambah Koordinat</p>
        </button>
      </div>
    </div>
  );
};

export default FormUpdateAsset;
