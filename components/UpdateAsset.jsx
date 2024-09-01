import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { DropdownInput, MainInput, RadioInput, TextAreaInput } from "./forms";
import {
  BookmarkSquareIcon,
  ChevronLeftIcon,
  MapPinIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectLogin } from "../store/features/auth/authSlice";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { selectKecamatan } from "../store/features/kecamatan/kecamatanSlice";
import { selectSkpdData } from "../store/features/skpd/skpdSlice";
import {
  addOnePolygon,
  createAssetAsync,
  deleteOnePolygon,
  editMapPolygonLat,
  editMapPolygonLng,
  hidePanel,
  selectHidePanel,
  selectMapPolygon,
  setListAssetAsync,
  setMapPolygon,
} from "../store/features/asset/assetSlice";
import { alertService } from "../utils/alert";

const UpdateAsset = ({ closeCallback }) => {
  const { type: user_type } = useAppSelector(selectLogin);
  const [isRendered, setIsRendered] = useState(true);
  const dispatch = useAppDispatch();
  const isHidden = useAppSelector(selectHidePanel);
  const kecamatan = useAppSelector(selectKecamatan);
  const mapPolygon = useAppSelector(selectMapPolygon);
  const skpd = useAppSelector(selectSkpdData);

  const assetSchema = yup.object().shape({
    skpd_id: yup.number().required("SKPD wajib diisi"),
    kecamatan_id: yup.number().required("Kecamatan wajib diisi"),
    penggunaan: yup.string().required("Penggunaan wajib diisi"),
    no_kib: yup.string().required("No. KIB wajib diisi"),
    kode_barang: yup.string().required("Kode Barang wajib diisi"),
    uraian: yup.string().required("Uraian wajib diisi"),
    tanggal_perolehan: yup.string().required("Tanggal Perolehan wajib diisi"),
    luas: yup.number().required("Luas wajib diisi"),
    alamat: yup.string().required("Alamat wajib diisi"),
    legalitas: yup.string().notRequired(),
    tanggal_legalitas: yup.string().notRequired(),
    nomor_legalitas: yup.string().notRequired(),
    asal_usul: yup.string().required("Asal Usul wajib diisi"),
    harga: yup.number().required("Harga wajib diisi"),
    keterangan: yup.string().required("Keterangan wajib diisi"),
    kategori: yup.string().required("Kategori wajib diisi"),
    desa: yup.string().required("Desa wajib diisi"),
    kasus: yup.boolean().required("Kasus wajib diisi"),
    uraian_kasus: yup.string().required("Uraian Kasus wajib diisi"),
    pemanfaatan: yup.boolean().required("Pemanfaatan wajib diisi"),
    keterangan_lainnya: yup.string().required("Keterangan Lainnya wajib diisi"),
  });
  const handleCreateAsset = async (val, action) => {
    if (user_type === "admin") {
      delete val.legalitas;
      delete val.tanggal_legalitas;
      delete val.pdf_legalitas;
      delete val.nomor_legalitas;
    }
    dispatch(
      createAssetAsync({
        ...val,
        koordinats: { coordinates: mapPolygon, type: "Polygon" },
      })
    ).then((res) => {
      if (res.payload.status) {
        alertService.success(res.payload.message);
        dispatch(setListAssetAsync());
        closeCallback(true);
      } else {
        alertService.error(res.payload.message);
      }
    });
    console.log(val);
    console.log(action);
  };

  const handleHidePanel = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("handleHidePanel  ");
    if (isHidden) {
      setTimeout(() => dispatch(hidePanel(false)), 10);
    } else {
      setTimeout(() => dispatch(hidePanel(true)), 10);
    }
  };

  const handleDeletePoly = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(setMapPolygon({ source: "manual", coordinates: [] }));
  };

  const handleAddManualPoly = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addOnePolygon([0, 0]));
  };

  const handleDeletePairCoord = (e, ind) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deleteOnePolygon(ind));
  };

  useEffect(() => {
    if (isHidden) {
      setIsRendered(false);
    } else {
      setIsRendered(true);
    }
  }, [isHidden]);

  return (
    <div
      onClick={(e) => closeCallback(true)}
      className={`fixed z-[1100] text-base h-screen duration-300 transition-all right-0 top-0 flex justify-end  ${
        isRendered ? "block w-[50%]" : "w-0"
      } ${isHidden ? "translate-x-full" : ""}`}
    >
      <div
        onClick={handleHidePanel}
        className={`${
          isRendered ? "hidden" : "block"
        } py-3 px-1 bg-sky-500 text-white cursor-pointer shadow-lg rounded-l-md absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full`}
      >
        <ChevronLeftIcon
          className={`aspect-auto h-5 transition-transform duration-300 rotate-0`}
        />
        <p className="absolute origin-left left-4 rounded-tl-md top-32 -rotate-90 text-nowrap bg-sky-500 pb-2 px-3 shadow-lg">
          Input Asset
        </p>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${
          isRendered ? "" : "overflow-hidden"
        } bg-white rounded-s-xl w-full relative transition-all duration-500`}
      >
        <div className="border-b border-gray-200 px-4 pb-2 pt-8 flex justify-items-start gap-3 justify-start items-center">
          <button
            onClick={() => closeCallback(true)}
            className="aspect-square h-8 bg-gray-200 p-2 text-gray-600 rounded-full transition-colors hover:bg-gray-300"
          >
            <ArrowLeftIcon />
          </button>
          <h2 className="font-semibold text-xl">Input Asset </h2>
          <span className="text-sm">atau</span>
          <button className="bg-sky-700 transition-colors hover:bg-sky-800 rounded-md text-white px-3 py-1 text-sm">
            Import Shapefile
          </button>
          <span className="text-sm">*.kml file</span>
        </div>
        <div className="overflow-y-scroll h-full pb-32">
          <Formik
            initialValues={{
              skpd_id: undefined,
              kecamatan_id: undefined,
              penggunaan: "",
              no_kib: "",
              kode_barang: "",
              uraian: "",
              tanggal_perolehan: "",
              luas: undefined,
              alamat: "",
              legalitas: "",
              tanggal_legalitas: "",
              nomor_legalitas: "",
              asal_usul: undefined,
              harga: undefined,
              keterangan: "",
              kategori: "",
              fungsi: "",
              desa: "",
              kasus: false,
              uraian_kasus: "",
              pemanfaatan: false,
              keterangan_lainnya: "",
              foto_1: "",
              foto_2: "",
            }}
            validationSchema={assetSchema}
            onSubmit={handleCreateAsset}
            validateOnChange={true}
          >
            {({ isSubmitting, errors, values, setFieldValue }) => (
              <Form>
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
                      value={
                        skpd.find((val) => val.id === values.skpd_id)?.nama
                      }
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
                      displayValues={[
                        "Beli",
                        "Hibah",
                        "Sewa",
                        "Pinjam",
                        "Pengadaan",
                        "Lainnya",
                      ]}
                      keyValues={[
                        "Beli",
                        "Hibah",
                        "Sewa",
                        "Pinjam",
                        "Pengadaan",
                        "Lainnya",
                      ]}
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
                      value={
                        kecamatan.find((val) => val.id === values.kecamatan_id)
                          ?.nama
                      }
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
                      user_type === "admin"
                        ? "text-gray-400 bg-gray-200"
                        : " bg-white"
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
                        displayValues={["Sertifikat", "Non Sertifikat"]}
                        keyValues={["Sertifikat", "Non Sertifikat"]}
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
                        placeholder={"PDF Legalitas"}
                        className="w-full"
                        type="file"
                        setValue={(e) => console.log(e)}
                      />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold pt-5">
                    Status dan Penggunaan
                  </h3>
                  <DropdownInput
                    name="Kategori"
                    displayValues={[
                      "Tanah Kosong",
                      "Bangunan",
                      "Jalan",
                      "Drainase",
                      "Lainnya",
                    ]}
                    keyValues={[
                      "Tanah Kosong",
                      "Bangunan",
                      "Jalan",
                      "Drainase",
                      "Lainnya",
                    ]}
                    value={values.kategori}
                    error={errors.kategori}
                    className="w-full"
                    setValue={(e) => setFieldValue("kategori", e)}
                  />
                  <div className="flex gap-3">
                    <RadioInput
                      name="Kasus"
                      displayValues={["Ada", "Tidak ada"]}
                      keyValues={[true, false]}
                      setValue={(e) => setFieldValue("kasus", e)}
                      value={values.kasus}
                      error={errors.kasus}
                    />
                    <RadioInput
                      name="Pemanfaatan"
                      displayValues={["Digunakan", "Tidak digunakan"]}
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
                    displayValues={[
                      "Nihil",
                      "Sengketa Masyarakat",
                      "Sengketa Perusahaan",
                      "Objek Tanah Tidak Jelas",
                      "Kawasan Hutan",
                      "Belum Balik Nama",
                      "Proses Sertifikasi",
                      "Pemanfaatan Tidak Sesuai RTRWK",
                      "Bukti Hak Tidak Lengkap",
                      "Data Awal belum sesuai kondisi Riil",
                    ]}
                    keyValues={[
                      "Nihil",
                      "Sengketa Masyarakat",
                      "Sengketa Perusahaan",
                      "Objek Tanah Tidak Jelas",
                      "Kawasan Hutan",
                      "Belum Balik Nama",
                      "Proses Sertifikasi",
                      "Pemanfaatan Tidak Sesuai RTRWK",
                      "Bukti Hak Tidak Lengkap",
                      "Data Awal belum sesuai kondisi Riil",
                    ]}
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
                      placeholder={"Masukkan Foto 1"}
                      className="w-full"
                      setValue={(e) => console.log(e)}
                    />
                    <MainInput
                      name="Foto 2"
                      type="file"
                      placeholder={"Masukkan Foto 2"}
                      className="w-full"
                      setValue={(e) => console.log(e)}
                    />
                  </div>
                  <div className="flex gap-3 items-center pt-5">
                    <h3 className="text-base font-semibold">Koordinat</h3>
                    <div className="flex gap-2 bg-gray-100 ps-1 border border-gray-200 pe-2 py-1 rounded-xl items-center">
                      <div
                        onClick={handleHidePanel}
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
                      <p className="text-sm text-gray-600">
                        type: {mapPolygon.source}
                      </p>
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
                                dispatch(
                                  editMapPolygonLat({ index: i, lat: e })
                                );
                              }}
                            />
                            <MainInput
                              name="Longitude"
                              placeholder={"Masukkan Longitude"}
                              className="w-full"
                              type="number"
                              value={val[1]}
                              setValue={(e) => {
                                dispatch(
                                  editMapPolygonLng({ index: i, lng: e })
                                );
                              }}
                            />
                            <button
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
                                dispatch(
                                  editMapPolygonLat({ index: i, lat: e })
                                );
                              }}
                            />
                            <MainInput
                              name="Longitude"
                              placeholder={"Masukkan Longitude"}
                              className="w-full"
                              value={val[1]}
                              disabled={true}
                              setValue={(e) => {
                                dispatch(
                                  editMapPolygonLng({ index: i, lng: e })
                                );
                              }}
                              s
                            />
                          </div>
                        ))}
                    <button
                      onClick={handleAddManualPoly}
                      disabled={mapPolygon.source !== "manual"}
                      className="flex hover:bg-gray-400 hover:text-white disabled:bg-gray-300 disabled:text-gray-400 disabled:border-gray-400 transition-colors rounded-lg items-center justify-center gap-3 h-10 border text-gray-400 border-gray-400 border-dashed w-full"
                    >
                      <PlusIcon className="aspect-auto h-full " />
                      <p>Tambah Koordinat</p>
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="h-10 w-full mt-5 rounded-lg bg-sky-400 flex gap-2 text-white justify-center items-center transition-colors hover:bg-sky-500"
                  >
                    <BookmarkSquareIcon className="aspect-auto h-full py-2" />
                    <p>Update Asset</p>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdateAsset;
