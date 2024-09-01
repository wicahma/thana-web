import React, { useRef, useState } from "react";

const ModalImportData = ({ assets, closeCallback }) => {
  return assets.length > 0 ? (
    <div>
      <div
        onClick={closeCallback}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1000]"
      />
      <div className="fixed flex flex-col top-1/2 overflow-hidden left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[80%] bg-white z-[1000] rounded-lg shadow-lg">
        <div className="flex justify-between gap-2 border-b border-b-gray-300 py-3 px-4">
          <h1 className="text-2xl grow font-semibold">Imported Data</h1>
          <button
            onClick={closeCallback}
            className="bg-red-700 text-white rounded-lg px-3 hover:bg-red-800 transition-colors py-2 text-sm font-medium"
          >
            Close
          </button>
          <button className="bg-sky-700 text-white rounded-lg px-3 hover:bg-sky-800 transition-colors py-2 text-sm font-medium">
            Upload
          </button>
        </div>
        <div className="h-full overflow-scroll">
          <table className=" border-separate border-spacing-y-2 p-3">
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
                <th className="break-keep text-nowrap px-2 text-start">Luas</th>
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
                <th className="break-keep text-nowrap px-2 text-start">Desa</th>
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
                <th className="break-keep text-nowrap px-2 text-start">SKPD</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={index}>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-l border-l-gray-400 rounded-s-lg border-y-gray-400">{index + 1}</td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.penggunaan}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.no_kib}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.kode_barang}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.uraian}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.tanggal_perolehan}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.luas}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.alamat}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.legalitas}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.tanggal_legalitas}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.nomor_legalitas}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.asal_usul}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.harga}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.keterangan}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.kategori}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.desa}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.kasus}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.uraian_kasus}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.pemanfaatan}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.keterangan_lainnya}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.coordinates}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-y-gray-400">
                    {asset.kecamatan}
                  </td>
                  <td className="break-keep text-nowrap px-2 py-2 border-y border-r border-r-gray-400 rounded-e-lg border-y-gray-400">
                    {asset.skpd}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ModalImportData;
