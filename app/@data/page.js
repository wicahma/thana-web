"use client";
import React, { useState } from "react";
import { dateTimeFormatter } from "../../utils/formatter";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownOnSquareStackIcon,
  ArrowUpOnSquareStackIcon,
  CheckIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import CreateAsset from "../../components/CreateAsset";

const Data = () => {
  const [extendedView, setExtendedView] = useState(true);
  const [dataEditIdentifier, setDataEditIdentifier] = useState(null);
  const dataModel = [
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

  return (
    <>
      <div className="fixed z-[1000] text-base w-screen h-screen top-0 flex justify-end left-0 ">
        <div
          className={`bg-white rounded-s-xl ${
            extendedView ? "max-w-[70%]" : "max-w-[30%]"
          }  w-full relative overflow-hidden transition-all duration-500`}
        >
          <div className="border-b border-gray-200 px-4 pb-2 pt-8 flex items-end gap-3">
            <h2 className="font-semibold text-xl">Data Asset</h2>
          </div>
          <div className="overflow-y-scroll h-full pb-32">
            <div
              className={`space-y-2 w-full text-gray-100 transition-all overflow-hidden duration-500 ${
                extendedView ? "h-0 p-0" : "h-28 p-3"
              }`}
            >
              <div className="flex gap-2 w-full flex-nowrap h-1/2 justify-between">
                <button className="bg-gray-600 h-full rounded-lg grow transition-colors hover:bg-gray-700 flex justify-center items-center">
                  <ArrowDownOnSquareStackIcon className="aspect-auto h-full p-2" />
                  <p>Import Data</p>
                </button>
                <button className="bg-gray-600 rounded-lg grow transition-colors hover:bg-gray-700 flex justify-center items-center">
                  <ArrowUpOnSquareStackIcon className="aspect-auto h-full p-2" />
                  <p>Export Data</p>
                </button>
              </div>
              <button
                onClick={() => setDataEditIdentifier("asset")}
                className="bg-sky-700 rounded-lg w-full h-1/2 transition-colors hover:bg-sky-800 flex justify-center items-center"
              >
                <PlusIcon className="aspect-auto h-full p-2" />
                <p>Input Asset</p>
              </button>
            </div>

            <div
              className={`w-[50%] text-gray-100 flex gap-3 transition-all duration-500 overflow-hidden mr-0 ms-auto ${
                extendedView ? "h-16 p-3" : "h-0 p-0"
              }`}
            >
              <button className="bg-gray-600 rounded-lg w-full h-full transition-colors hover:bg-gray-700 flex justify-center items-center">
                <ArrowDownOnSquareStackIcon className="aspect-auto h-full p-2" />
                <p>Import Data</p>
              </button>
              <button className="bg-gray-600 rounded-lg w-full h-full transition-colors hover:bg-gray-700 flex justify-center items-center">
                <ArrowUpOnSquareStackIcon className="aspect-auto h-full p-2" />
                <p>Export Data</p>
              </button>
              <button
                onClick={() => setDataEditIdentifier("asset")}
                className="bg-sky-700 rounded-lg w-full h-full transition-colors hover:bg-sky-800 flex justify-center items-center"
              >
                <PlusIcon className="aspect-auto h-full p-2" />
                <p>Input Asset</p>
              </button>
            </div>
            <table className="w-full border-separate border-spacing-y-2 px-3">
              <thead>
                <tr>
                  <th className="text-start text-gray-800 font-normal rounded-s-lg bg-gray-200 py-3 ps-3">
                    Penggunaan
                  </th>
                  <th className="text-start text-gray-800 font-normal bg-gray-200 py-3 ps-3">
                    SKPD
                  </th>
                  {extendedView ? (
                    <>
                      <th className="text-start text-gray-800 font-normal bg-gray-200 py-3 ps-3">
                        Kecamatan
                      </th>
                      <th className="text-start text-gray-800 font-normal bg-gray-200 py-3 ps-3">
                        Desa
                      </th>
                      <th className="text-start text-gray-800 font-normal bg-gray-200 py-3 ps-3">
                        Alamat
                      </th>
                      <th className="text-start text-gray-800 font-normal bg-gray-200 py-3 ps-3">
                        Legalitas
                      </th>
                      <th className="text-start text-gray-800 font-normal bg-gray-200 py34">
                        Kasus
                      </th>
                      <th className="text-start text-gray-800 font-normal bg-gray-200 py-3 ps-3">
                        Uraian Kasus
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="text-start text-gray-800 font-normal bg-gray-200 py34">
                        Kasus
                      </th>
                    </>
                  )}
                  <th className="text-start text-gray-800 font-normal bg-gray-200 py34">
                    Action
                  </th>
                  <th className="text-start text-gray-800 font-normal rounded-e-lg bg-gray-200 py-3 ps-3">
                    Tanggal Update
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-900">
                {dataModel.map((data, i) => (
                  <tr key={i}>
                    <td className="rounded-s-lg border-l border-y px-3 h-12 border-gray-200">
                      {data.penggunaan}
                    </td>
                    <td className="max-w-32 border-y px-3 h-12">
                      <p className="line-clamp-1 break-all">{data.skpd}</p>
                    </td>
                    {extendedView ? (
                      <>
                        <td className="max-w-24 border-y px-3 h-12">
                          <p className="line-clamp-1 break-all">
                            {data.kecamatan}
                          </p>
                        </td>
                        <td className="max-w-24 border-y px-3 h-12">
                          <p className="line-clamp-1 break-all">{data.desa}</p>
                        </td>
                        <td className="max-w-24 border-y px-3 h-12">
                          <p className="line-clamp-1 break-all">
                            {data.alamat}
                          </p>
                        </td>
                        <td className=" border-y px-3 h-12">{data.leglitas}</td>
                        <td className="border-y h-12">
                          <div
                            className={`${
                              data.kasus
                                ? "ring-red-600 bg-red-600 text-red-200"
                                : "ring-lime-400 bg-lime-400 text-lime-900"
                            } ring-2 flex justify-center items-center aspect-square h-full`}
                          >
                            {data.kasus ? (
                              <CheckIcon className="aspect-auto h-5" />
                            ) : (
                              <XMarkIcon className="aspect-auto h-5" />
                            )}
                          </div>
                        </td>
                        <td className=" border-y px-3 h-12 max-w-32">
                          <p className="line-clamp-1 break-all">
                            {data.uraian_kasus || "-"}
                          </p>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border-y h-12">
                          <div
                            className={`${
                              data.kasus
                                ? "ring-red-600 bg-red-600 text-red-200"
                                : "ring-lime-400 bg-lime-400 text-lime-900"
                            } ring-2 flex justify-center items-center aspect-square h-full`}
                          >
                            {data.kasus ? (
                              <CheckIcon className="aspect-auto h-5" />
                            ) : (
                              <XMarkIcon className="aspect-auto h-5" />
                            )}
                          </div>
                        </td>
                      </>
                    )}
                    <td className="border-y h-12 max-w-fit">
                      <button className="aspect-square p-3 h-full bg-orange-400 text-white ring-2 ring-orange-400 hover:bg-orange-500 hover:ring-orange-500 transition-colors">
                        <PencilSquareIcon />
                      </button>
                      <button className="aspect-square p-3 h-full bg-red-600 text-white ring-2 ring-red-600 hover:bg-red-700 hover:ring-red-700 transition-colors">
                        <TrashIcon />
                      </button>
                    </td>
                    <td className="text-nowrap border-y px-3 h-12 border-e rounded-e-lg">
                      {dateTimeFormatter(data.updatedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="h-fit w-full bg-white absolute bottom-0 p-3 pb-4 border-t border-gray-200 flex justify-end">
            {extendedView ?? <p>Anying</p>}
            <button
              onClick={() => setExtendedView(!extendedView)}
              className="underline text-gray-500"
            >
              {extendedView ? "Extend view" : "Collapse view"}
            </button>
          </div>
        </div>
      </div>
      <div>
        {dataEditIdentifier === "asset" && (
          <CreateAsset
            closeCallback={(isClose) => setDataEditIdentifier(null)}
          />
        )}
      </div>
    </>
  );
};

export default Data;
