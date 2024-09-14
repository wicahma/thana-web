import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import React, { createRef, useEffect, useState } from "react";
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
import { selectKecamatan } from "../store/features/kecamatan/kecamatanSlice";
import { selectSkpdData } from "../store/features/skpd/skpdSlice";
import {
  addOnePolygon,
  addOnePolygonCreate,
  createAssetAsync,
  deleteOnePolygon,
  deleteOnePolygonCreate,
  editMapPolygonLat,
  editMapPolygonLatCreate,
  editMapPolygonLng,
  editMapPolygonLngCreate,
  hidePanel,
  selectHidePanel,
  selectMapPolygon,
  selectMapPolygonCreate,
  setListAssetAsync,
  setMapPolygon,
  setMapPolygonCreate,
} from "../store/features/asset/assetSlice";
import { alertService } from "../utils/alert";
import { assetSchema } from "../helper/validator";
import {
  asalUsulType,
  initAsset,
  kasusType,
  kategoriType,
  legalitasType,
  pemanfaatanType,
  uraianKasusType,
} from "../helper/constant";
import { kml } from "@tmcw/togeojson";
import ModalImportDataKml from "./modals/ModalImportDataKml";

const CreateAsset = ({ closeCallback }) => {
  const { type: user_type } = useAppSelector(selectLogin);
  const [isRendered, setIsRendered] = useState(true);
  const dispatch = useAppDispatch();
  const isHidden = useAppSelector(selectHidePanel);
  const kecamatan = useAppSelector(selectKecamatan);
  const mapPolygon = useAppSelector(selectMapPolygonCreate);
  const skpd = useAppSelector(selectSkpdData);
  const [features, setFeatures] = useState();

  const [fileError, setFileError] = useState({ pdf: "", foto1: "", foto2: "" });

  const handleCreateAsset = async (val, action) => {
    if (val.pdf_legalitas === undefined) {
      setFileError({ pdf: "PDF Legalitas wajib diisi" });
      return;
    }
    if (val.foto_1 === undefined) {
      setFileError({ foto1: "Foto 1 wajib diisi" });
      return;
    }
    if (val.foto_2 === undefined) {
      setFileError({ foto2: "Foto 2 wajib diisi" });
      return;
    }

    setFileError({ pdf: "", foto1: "", foto2: "" });
    if (user_type === "admin") {
      delete val.legalitas;
      delete val.tanggal_legalitas;
      delete val.pdf_legalitas;
      delete val.nomor_legalitas;
    }
    dispatch(
      createAssetAsync({
        ...val,
        koordinats: {
          type: "Polygon",
          coordinates: [[...mapPolygon.coordinates, mapPolygon.coordinates[0]]],
        },
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

  const handleImportKml = (e) => {
    try {
      e.stopPropagation();
      e.preventDefault();
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".kml";
      fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = async (e) => {
          const geoJson = kml(
            new DOMParser().parseFromString(e.target.result, "text/xml"),
            {
              skipNullGeometry: true,
            }
          );

          const featureCollection = geoJson.features.flat(Infinity);
          console.log(featureCollection);
          featureCollection.forEach((feature) => {
            if (feature.geometry.type === "Polygon") {
              setFeatures((prev) => {
                if (prev === undefined) return [];
                else
                  return [
                    ...prev,
                    {
                      ...initAsset,
                      koordinats: feature.geometry,
                      penggunaan: feature.properties.Nama,
                      luas: feature.properties.Luas,
                    },
                  ];
              });
            }
          });
        };
        reader.readAsText(file);
      };
      fileInput.click();
    } catch (e) {
      console.error(e);
      alertService.error("Gagal membaca file!");
    }
  };

  const handleDeletePoly = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(setMapPolygonCreate({ source: "manual", coordinates: [] }));
  };

  const handleAddManualPoly = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addOnePolygonCreate([0, 0]));
  };

  const handleDeletePairCoord = (e, ind) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deleteOnePolygonCreate(ind));
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
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        closeCallback(true);
      }}
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              closeCallback(true);
            }}
            className="aspect-square h-8 bg-gray-200 p-2 text-gray-600 rounded-full transition-colors hover:bg-gray-300"
          >
            <ArrowLeftIcon />
          </button>
          <h2 className="font-semibold text-xl">Input Asset </h2>
          <span className="text-sm">atau</span>
          <button
            onClick={handleImportKml}
            className="bg-sky-700 transition-colors hover:bg-sky-800 rounded-md text-white px-3 py-1 text-sm"
          >
            Import Shapefile
          </button>
          <span className="text-sm">*.kml file</span>
        </div>
        <div className="overflow-y-scroll h-full pb-32">
          <Formik
            initialValues={initAsset}
            validationSchema={assetSchema}
            onSubmit={handleCreateAsset}
            validateOnChange={true}
          >
            {({ errors, values, setFieldValue }) => (
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
                        placeholder={"PDF Legalitas"}
                        className="w-full"
                        type="file"
                        error={fileError.pdf}
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

                  <h3 className="text-base font-semibold pt-5">
                    Status dan Penggunaan
                  </h3>
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
                      placeholder={"Masukkan Foto 1"}
                      accept="image/*"
                      className="w-full"
                      setValue={(e) => {
                        const data = e.target.files[0];
                        if (data) {
                          if (
                            data.type.includes("image") &&
                            data.size <= 5_000_000
                          ) {
                            setFileError({
                              foto1: "",
                            });
                            return setFieldValue("foto_1", data);
                          }
                          e.target.files = null;
                          e.target.value = "";
                          setFileError({
                            foto1:
                              "Foto 1 wajib diisi, berjenis gambar & kurang dari 5mb",
                          });
                          return setFieldValue("foto_1", undefined);
                        }
                      }}
                      error={fileError.foto1}
                    />
                    <MainInput
                      name="Foto 2"
                      type="file"
                      placeholder={"Masukkan Foto 2"}
                      accept="image/*"
                      className="w-full"
                      setValue={(e) => {
                        const data = e.target.files[0];
                        if (data) {
                          if (
                            data.type.includes("image") &&
                            data.size <= 5_000_000
                          ) {
                            setFileError({
                              foto2: "",
                            });
                            return setFieldValue("foto_2", data);
                          }
                          e.target.files = null;
                          e.target.value = "";
                          setFileError({
                            foto2:
                              "Foto 2 wajib diisi, berjenis gambar & kurang dari 5mb",
                          });
                          return setFieldValue("foto_2", undefined);
                        }
                      }}
                      error={fileError.foto2}
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
                                  editMapPolygonLatCreate({ index: i, lat: e })
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
                                  editMapPolygonLngCreate({ index: i, lng: e })
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
                                  editMapPolygonLatCreate({ index: i, lat: e })
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
                                  editMapPolygonLngCreate({ index: i, lng: e })
                                );
                              }}
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
                    <p>Buat Asset</p>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ModalImportDataKml
        features={features}
        setFeatures={setFeatures}
        modalKmlCloseCallback={(e) => {
          if (e) {
            e.stopPropagation();
            e.preventDefault();
          }
          setFeatures();
        }}
        handleImportCallback={handleImportKml}
      />
    </div>
  );
};

export default CreateAsset;
