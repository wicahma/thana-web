import { ArrowDownOnSquareStackIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { createBulkAsset, setListAssetAsync } from "../../store/features/asset/assetSlice";
import { alertService } from "../../utils/alert";

const ModalImportDataCsv = ({
  assets,
  closeCallback,
  handleImportCallback,
}) => {
  const dispatch = useAppDispatch();
  const handleBulkUpload = () => {
    console.log(assets)
    // dispatch(createBulkAsset({ data: assets, type: "csv" })).then((res) => {
    //   if (res.payload.status) {
    //     alertService.success(res.payload.message);
    //     dispatch(setListAssetAsync());
    //     return closeCallback();
    //   }
    //   return alertService.error(res.payload.message.toString());
    // });
  };

  return Array.isArray(assets) ? (
    <div>
      <div
        onClick={closeCallback}
        className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-sm bg-opacity-50 z-[1100]"
      />
      <div className="fixed flex flex-col top-1/2 border border-gray-400 overflow-hidden left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[80%] bg-white z-[1101] rounded-lg shadow-lg">
        <div>
          <div className="flex justify-between items-center border-b border-b-gray-300 h-12 ps-4">
            <h1 className="text-2xl grow font-semibold pe-3">Imported Data</h1>
            <button
              onClick={closeCallback}
              className="bg-red-500 text-white px-5 hover:bg-red-800 transition-colors py-2 h-full"
            >
              Close
            </button>
            <button
              onClick={handleBulkUpload}
              disabled={assets === null || assets.length <= 0}
              className="bg-lime-500 text-white hover:text-white px-5 disabled:bg-lime-200 hover:bg-lime-600 transition-colors py-2 h-full"
            >
              Upload
            </button>
          </div>
          <p className="px-3 py-1">
            Kolom yang wajib ada pada file .csv yang diimport dengan nama yang
            <b> sama persis</b> adalah{" "}
            <span className="bg-sky-300 rounded-md px-2 py-1 text-sky-800 text-sm">
              penggunaan
            </span>
            ,{" "}
            <span className="bg-sky-300 rounded-md px-2 py-1 text-sky-800 text-sm">
              no_kib
            </span>
            ,{" "}
            <span className="bg-sky-300 rounded-md px-2 py-1 text-sky-800 text-sm">
              kode_barang
            </span>
          </p>
        </div>
        {assets.length <= 0 && (
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
        {assets !== null && assets.length > 0 && (
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
                {assets.map((asset, index) => (
                  <tr key={index}>
                    <td className="break-keep text-nowrap px-2 py-2 border-y border-l border-l-gray-400 rounded-s-lg border-y-gray-400">
                      {index + 1}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.penggunaan ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.penggunaan ? asset.penggunaan : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.no_kib ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.no_kib ? asset.no_kib : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.kode_barang ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.kode_barang ? asset.kode_barang : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.uraian ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.uraian ? asset.uraian : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.tanggal_perolehan ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.tanggal_perolehan
                        ? asset.tanggal_perolehan
                        : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.luas ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.luas ? asset.luas : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.alamat ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.alamat ? asset.alamat : "No data"}
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
                      {asset.harga ? asset.harga : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.keterangan ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.keterangan ? asset.keterangan : "No data"}
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
                      {asset.desa ? asset.desa : "No data"}
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
                      {asset.keterangan_lainnya
                        ? asset.keterangan_lainnya
                        : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.coordinates ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.coordinates ? asset.coordinates : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-y-gray-400 ${
                        asset.kecamatan ? "" : "text-gray-400"
                      }`}
                    >
                      {asset.kecamatan ? asset.kecamatan : "No data"}
                    </td>
                    <td
                      className={`break-keep text-nowrap px-2 py-2 border-y border-r border-r-gray-400 rounded-e-lg border-y-gray-400 ${
                        asset.skpd ? "" : "text-gray-400"
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

export default ModalImportDataCsv;
