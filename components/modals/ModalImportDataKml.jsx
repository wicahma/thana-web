import { ArrowDownOnSquareStackIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  checkAssetLoading,
  createBulkAsset,
  setListAssetAsync,
} from "../../store/features/asset/assetSlice";
import { alertService } from "../../utils/alert";
import { MainInput } from "../forms";

const ModalImportDataKml = ({
  features,
  setFeatures,
  modalKmlCloseCallback,
  handleImportCallback,
}) => {
  const dispatch = useAppDispatch();
  const { create_bulk_asset_status } = useAppSelector(checkAssetLoading);
  const handleBulkUpload = () => {
    const newFeatures = features.map((feature, i) => {
      if (feature.koordinats.coordinates[0][0].length > 2) {
        return {
          ...feature,
          koordinats: {
            ...feature.koordinats,
            coordinates: [
              feature.koordinats.coordinates[0].map((item) => [
                item[1],
                item[0],
              ]),
            ],
          },
        };
      }
      return feature;
    });
    dispatch(createBulkAsset({ data: newFeatures, type: "kml" })).then(
      (res) => {
        if (res.payload.status) {
          alertService.success(res.payload.message);
          dispatch(setListAssetAsync());
          return modalKmlCloseCallback();
        }
        return alertService.error(res.payload.message.toString());
      }
    );
  };

  return Array.isArray(features) ? (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div
        onClick={modalKmlCloseCallback}
        className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-sm bg-opacity-50 z-[1200]"
      />
      <div className="fixed flex flex-col top-1/2 border border-gray-400 overflow-hidden left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[80%] bg-white z-[1201] rounded-lg shadow-lg">
        <div>
          <div className="flex justify-between items-center border-b border-b-gray-300 h-12 ps-4">
            <h1 className="text-2xl grow font-semibold pe-3">Imported Data</h1>
            <button
              onClick={modalKmlCloseCallback}
              disabled={create_bulk_asset_status.includes("loading")}
              className="bg-red-500 text-white px-5 hover:bg-red-800 transition-colors py-2 h-full"
            >
              Close
            </button>
            <button
              onClick={handleBulkUpload}
              disabled={
                features === null ||
                features.length <= 0 ||
                create_bulk_asset_status.includes("loading")
              }
              className="bg-lime-500 flex gap-2 justify-center group items-center text-gray-800 hover:text-white px-5 disabled:bg-lime-200 hover:bg-lime-600 transition-colors py-2 h-full"
            >
              {create_bulk_asset_status.includes("loading") && (
                <div className="loader group-hover:border-white border-gray-800" />
              )}
              Upload
            </button>
          </div>
        </div>
        {features.length <= 0 && (
          <div className="p-10 text-center text-gray-400 flex justify-center items-center flex-col h-full">
            <h1 className="text-2xl font-semibold text-center">
              Data tidak ada
            </h1>
            <p>
              Tidak ada data pada file tersebut, silahkan upload file *.csv yang
              memiliki data.
            </p>
            <button
              onClick={handleImportCallback}
              className="bg-gray-600 h-8 mt-10 px-2 rounded-lg transition-colors hover:bg-gray-700 flex justify-center items-center"
            >
              <ArrowDownOnSquareStackIcon className="aspect-auto h-full p-2" />
              <p>Import Data</p>
            </button>
          </div>
        )}
        {features !== null && features.length > 0 && (
          <div className="h-full overflow-scroll">
            <table className="border-separate border-spacing-y-2 px-3">
              <thead>
                <tr>
                  <th className="break-keep text-nowrap px-2 text-start">No</th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Penggunaan
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    No. KIB
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Kode Barang
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Uraian
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Tanggal Perolehan
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Luas
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Alamat
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Legalitas
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Tanggal Legalitas
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Nomor Legalitas
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Asal Usul
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Harga
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Keterangan
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Kategori
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Desa
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Kasus
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Uraian Kasus
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Pemanfaatan
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Keterangan Lainnya
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Coordinates
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    Kecamatan
                  </th>
                  <th className="break-keep text-nowrap px-2 text-start">
                    SKPD
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((asset, index) => (
                  <tr key={index} className="h-11 overflow-hidden">
                    <td className="break-keep text-nowrap px-2 py-2 border-y border-l border-l-gray-400 rounded-s-lg border-y-gray-400">
                      {index + 1}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 border-y border-y-gray-400 ${
                        asset.penggunaan ? "" : "text-gray-400"
                      }`}
                    >
                      <div className="h-full">
                        <MainInput
                          className="w-full h-full"
                          value={asset.penggunaan}
                          placeholder={
                            asset.penggunaan ? asset.penggunaan : "No data"
                          }
                          inputClassName="border-y-0 border-gray-400 rounded-none"
                          setValue={(e) =>
                            setFeatures((prev) => {
                              const newPrev = [...prev];
                              newPrev[index].penggunaan = e.toUpperCase();
                              return newPrev;
                            })
                          }
                        />
                      </div>
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.no_kib ? "" : "text-gray-400"
                      }`}
                    >
                      <MainInput
                        className="w-full h-full"
                        value={asset.no_kib}
                        placeholder={asset.no_kib ? asset.no_kib : "No data"}
                        inputClassName="border-y-0 border-gray-400 rounded-none"
                        setValue={(e) =>
                          setFeatures((prev) => {
                            const newPrev = [...prev];
                            newPrev[index].no_kib = e;
                            return newPrev;
                          })
                        }
                      />
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.kode_barang ? "" : "text-gray-400"
                      }`}
                    >
                      <MainInput
                        className="w-full h-full"
                        value={asset.kode_barang}
                        placeholder={
                          asset.kode_barang ? asset.kode_barang : "No data"
                        }
                        inputClassName="border-y-0 border-gray-400 rounded-none"
                        setValue={(e) =>
                          setFeatures((prev) => {
                            const newPrev = [...prev];
                            newPrev[index].kode_barang = e;
                            return newPrev;
                          })
                        }
                      />
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.uraian ? "" : "text-gray-400"
                      }`}
                    >
                      <MainInput
                        className="w-full h-full"
                        value={asset.uraian}
                        placeholder={asset.uraian ? asset.uraian : "No data"}
                        inputClassName="border-y-0 border-gray-400 rounded-none"
                        setValue={(e) =>
                          setFeatures((prev) => {
                            const newPrev = [...prev];
                            newPrev[index].uraian = e;
                            return newPrev;
                          })
                        }
                      />
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.tanggal_perolehan ? "" : "text-gray-400"
                      }`}
                    >
                      <MainInput
                        className="w-full h-full"
                        value={asset.tanggal_perolehan}
                        placeholder={
                          asset.tanggal_perolehan
                            ? asset.tanggal_perolehan
                            : "No data"
                        }
                        inputClassName="border-y-0 border-gray-400 rounded-none"
                        setValue={(e) =>
                          setFeatures((prev) => {
                            const newPrev = [...prev];
                            newPrev[index].tanggal_perolehan = e;
                            return newPrev;
                          })
                        }
                      />
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.luas ? "" : "text-gray-400"
                      }`}
                    >
                      <MainInput
                        className="w-full h-full"
                        value={asset.luas}
                        placeholder={asset.luas ? asset.luas : "No data"}
                        inputClassName="border-y-0 border-gray-400 rounded-none"
                        setValue={(e) =>
                          setFeatures((prev) => {
                            const newPrev = [...prev];
                            newPrev[index].luas = e;
                            return newPrev;
                          })
                        }
                      />
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.alamat ? "" : "text-gray-400"
                      }`}
                    >
                      <MainInput
                        className="w-full h-full"
                        value={asset.alamat}
                        placeholder={asset.alamat ? asset.alamat : "No data"}
                        inputClassName="border-y-0 border-gray-400 rounded-none"
                        setValue={(e) =>
                          setFeatures((prev) => {
                            const newPrev = [...prev];
                            newPrev[index].alamat = e;
                            return newPrev;
                          })
                        }
                      />
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.legalitas ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.legalitas ? asset.legalitas : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.tanggal_legalitas ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.tanggal_legalitas
                        ? asset.tanggal_legalitas
                        : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.nomor_legalitas ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.nomor_legalitas
                        ? asset.nomor_legalitas
                        : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.asal_usul ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.asal_usul ? asset.asal_usul : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.harga ? "" : "text-gray-400"
                      }`}
                    >
                      <MainInput
                        className="w-full h-full"
                        value={asset.harga}
                        placeholder={asset.harga ? asset.harga : "No data"}
                        inputClassName="border-y-0 border-gray-400 rounded-none"
                        setValue={(e) =>
                          setFeatures((prev) => {
                            const newPrev = [...prev];
                            newPrev[index].harga = e;
                            return newPrev;
                          })
                        }
                      />
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.keterangan ? "" : "text-gray-400"
                      }`}
                    >
                      <MainInput
                        className="w-full h-full"
                        value={asset.keterangan}
                        placeholder={
                          asset.keterangan ? asset.keterangan : "No data"
                        }
                        inputClassName="border-y-0 border-gray-400 rounded-none"
                        setValue={(e) =>
                          setFeatures((prev) => {
                            const newPrev = [...prev];
                            newPrev[index].keterangan = e;
                            return newPrev;
                          })
                        }
                      />
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.kategori ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.kategori ? asset.kategori : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.desa ? "" : "text-gray-400"
                      }`}
                    >
                      <MainInput
                        className="w-full h-full"
                        value={asset.desa}
                        placeholder={asset.desa ? asset.desa : "No data"}
                        inputClassName="border-y-0 border-gray-400 rounded-none"
                        setValue={(e) =>
                          setFeatures((prev) => {
                            const newPrev = [...prev];
                            newPrev[index].desa = e;
                            return newPrev;
                          })
                        }
                      />
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.kasus ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.kasus
                        ? asset.kasus
                          ? "Ada"
                          : "Tidak ada"
                        : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.uraian_kasus ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.uraian_kasus ? asset.uraian_kasus : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.pemanfaatan ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.pemanfaatan
                        ? asset.pemanfaatan
                          ? "Digunakan"
                          : "Tidak Digunakan"
                        : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.keterangan_lainnya ? "" : "text-gray-400"
                      }`}
                    >
                      <MainInput
                        className="w-full h-full"
                        value={asset.keterangan_lainnya}
                        placeholder={
                          asset.keterangan_lainnya
                            ? asset.keterangan_lainnya
                            : "No data"
                        }
                        inputClassName="border-y-0 border-gray-400 rounded-none"
                        setValue={(e) =>
                          setFeatures((prev) => {
                            const newPrev = [...prev];
                            newPrev[index].keterangan_lainnya = e;
                            return newPrev;
                          })
                        }
                      />
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y font-semibold border-y-gray-400 ${
                        asset.koordinats ? "text-lime-600" : "text-red-600"
                      }`}
                    >
                      {asset.koordinats ? "Shapefile Found" : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.kecamatan ? "text-gray-600" : "text-gray-200"
                      }`}
                    >
                      {asset.kecamatan ? asset.kecamatan : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-r border-r-gray-400 rounded-e-lg border-y-gray-400 ${
                        asset.skpd ? "text-gray-600" : "text-gray-200"
                      }`}
                    >
                      {asset.skpd ? asset.skpd : "No data"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ModalImportDataKml;
