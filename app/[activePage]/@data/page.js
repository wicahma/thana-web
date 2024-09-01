"use client";
import React, { useEffect, useRef, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownOnSquareStackIcon,
  ArrowUpOnSquareStackIcon,
  CheckIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import {
  selectAssets,
  selectHidePanel,
  setAllAssetAsync,
  setListAssetAsync,
} from "../../../store/features/asset/assetSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { dateTimeFormatter } from "../../../utils/formatter";
import CreateAsset from "../../../components/CreateAsset";
import { getListKecAsync } from "../../../store/features/kecamatan/kecamatanSlice";
import { getListSkpdAsync } from "../../../store/features/skpd/skpdSlice";
import { generate } from "csv-generate";
import { json2csv } from "json-2-csv";
import { selectLogin } from "../../../store/features/auth/authSlice";
import { downloadBlob } from "../../../utils/downloader";
import { parse } from "csv-parse";
import ModalImportData from "../../../components/modals/ModalImportData";
import ModalDeleteAsset from "../../../components/modals/ModalDeleteAsset";

const Data = () => {
  const [extendedView, setExtendedView] = useState(false);
  const [dataEditIdentifier, setDataEditIdentifier] = useState(null);
  const assets = useAppSelector(selectAssets);
  const { type } = useAppSelector(selectLogin);
  const isHidden = useAppSelector(selectHidePanel);
  const [importedData, setImportedData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setListAssetAsync()).then((res) => {
      console.log("RES ASSET DI DATA PAGE", res);
    });
    dispatch(getListSkpdAsync()).then((res) => {
      console.log("RES SKPD DI DATA PAGE", res);
    });
    dispatch(getListKecAsync()).then((res) => {
      console.log("RES KECAMATAN DI DATA PAGE", res);
    });
  }, []);

  const handleExportData = () => {
    try {
      dispatch(setAllAssetAsync()).then((res) => {
        let assetData = res.payload.data;
        if (type === "admin") {
          assetData = assetData.map((data, i) => {
            return {
              ...data,
              pdf_legalitas: data.pdf_legalitas ? "Ada" : "Tidak ada",
            };
          });
        }
        const csv = json2csv(assetData);
        downloadBlob(csv, "data_asset.csv", "text/csv");
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleImportData = () => {
    setImportedData([]);
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".csv";
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const csv = e.target.result;
        const data = parse(
          csv,
          {
            columns: true,
            group_columns_by_name: true,
            cast: (val, ctx) => {
              let def = val;
              if (ctx.column === "koordinats.coordinates") {
                def = JSON.parse(val);
              }
              return def;
            },
          },
          (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            return data;
          }
        );
        data.on("data", (row) => {
          setImportedData((prev) => [...prev, row]);
        });
      };
      reader.readAsText(file);
    };
    fileInput.click();
  };

  return (
    <>
      <div
        className={`${
          isHidden ? "hidden overflow-hidden" : "block"
        } fixed z-[1000] text-base w-screen h-screen top-0 flex justify-end left-0`}
      >
        <div
          className={`bg-white shadow-lg rounded-s-xl ${
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
                <button
                  onClick={handleImportData}
                  className="bg-gray-600 h-full rounded-lg grow transition-colors hover:bg-gray-700 flex justify-center items-center"
                >
                  <ArrowDownOnSquareStackIcon className="aspect-auto h-full p-2" />
                  <p>Import Data</p>
                </button>
                <button
                  onClick={handleExportData}
                  className="bg-gray-600 rounded-lg grow transition-colors hover:bg-gray-700 flex justify-center items-center"
                >
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
              <button
                onClick={handleImportData}
                className="bg-gray-600 rounded-lg w-full h-full transition-colors hover:bg-gray-700 flex justify-center items-center"
              >
                <ArrowDownOnSquareStackIcon className="aspect-auto h-full p-2" />
                <p>Import Data</p>
              </button>
              <button
                onClick={handleExportData}
                className="bg-gray-600 rounded-lg w-full h-full transition-colors hover:bg-gray-700 flex justify-center items-center"
              >
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
                {assets.map((data, i) => (
                  <tr key={i}>
                    <td className="rounded-s-lg border-l border-y px-3 h-12 border-gray-200">
                      {data.penggunaan}
                    </td>
                    <td className="max-w-32 border-y px-3 h-12">
                      <p className="line-clamp-1 break-all">{data.skpd.nama}</p>
                    </td>
                    {extendedView ? (
                      <>
                        <td className="max-w-24 border-y px-3 h-12">
                          <p className="line-clamp-1 break-all">
                            {data.kecamatan.nama}
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
                      <div className="flex flex-nowrap h-full aspect-[2/1]">
                        <button className="aspect-square p-3 h-full bg-orange-400 text-white ring-2 ring-orange-400 hover:bg-orange-500 hover:ring-orange-500 transition-colors">
                          <PencilSquareIcon />
                        </button>
                        <button
                          onClick={() => setDeleteId(data.uuid)}
                          className="aspect-square p-3 h-full bg-red-600 text-white ring-2 ring-red-600 hover:bg-red-700 hover:ring-red-700 transition-colors"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                    <td className="text-nowrap border-y px-3 h-12 border-e rounded-e-lg">
                      {data.updatedAt && dateTimeFormatter(data.updatedAt)}
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
      <ModalImportData
        assets={importedData}
        closeCallback={(e) => {
          setImportedData([]);
        }}
      />
      <ModalDeleteAsset
        id={deleteId}
        closeCallback={() => {
          setDeleteId(null);
        }}
      />
    </>
  );
};

export default Data;
