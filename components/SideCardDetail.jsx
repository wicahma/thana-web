"use client";
import React, { useState } from "react";
import {
  CalendarIcon,
  DocumentIcon,
  GlobeAmericasIcon,
  GlobeAsiaAustraliaIcon,
  PauseIcon,
} from "@heroicons/react/24/solid";
import {
  DocumentDuplicateIcon,
  ChevronLeftIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { currencyFormatter, dateTimeFormatter } from "../utils/formatter";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  resetPreviewAsset,
  selectPreviewAsset,
} from "../store/features/asset/assetSlice";

const SideCardDetail = () => {
  const previewAsset = useAppSelector(selectPreviewAsset);
  const [showNav, setShowNav] = useState(true);
  const [isRendered, setIsRendered] = useState(true);
  const dispatch = useAppDispatch();
  const handleCard = () => {
    if (showNav) {
      setShowNav(false);
      setTimeout(() => setIsRendered(false), 300);
    } else {
      setIsRendered(true);
      setTimeout(() => setShowNav(true), 10);
    }
  };

  return previewAsset.penggunaan !== "" ? (
    <div
      className={`fixed top-0 z-[1200] h-screen w-fit duration-300 transition-all py-3 ${
        showNav ? "pl-3 left-0" : "pl-0 -translate-x-full"
      } ${isRendered ? "block" : "w-0 "}`}
    >
      <div
        className={`rounded-xl bg-white h-full relative shadow-lg border border-gray-200 ${
          isRendered ? "" : "overflow-hidden"
        }`}
      >
        <div
          onClick={() => {
            dispatch(resetPreviewAsset());
          }}
          className="rounded-lg absolute top-2 right-2 aspect-square h-7 opacity-50"
        >
          <XMarkIcon />
        </div>
        <div className="w-full h-[30%] bg-black/10 rounded-t-xl">
          <img src="" alt="Gambar" />
        </div>
        <div className="p-3">
          <h2>{previewAsset.penggunaan}</h2>
          <div className="flex items-center justify-items-center gap-1  text-xs">
            <h2>{previewAsset.no_kib}</h2>
            <DocumentDuplicateIcon className="h-3" />
          </div>
        </div>
        <div className="flex p-1 gap-1 border-b border-b-gray-200">
          <button className="flex justify-center gap-1 grow items-center border font-light text-sm border-gray-400 p-1 rounded-lg bg-gray-100">
            <GlobeAmericasIcon className="h-6" />
            <p>
              {previewAsset.koordinats.coordinates[0][0][0]
                .toString()
                .slice(0, 10)}
            </p>
          </button>
          <button className="flex justify-center gap-1 grow items-center border font-light text-sm border-gray-400 p-1 rounded-lg bg-gray-100">
            <GlobeAsiaAustraliaIcon className="h-6" />
            <p>
              {previewAsset.koordinats.coordinates[0][0][1]
                .toString()
                .slice(0, 10)}
            </p>
          </button>
          <button className="border border-gray-400 p-1 rounded-lg bg-gray-100">
            <DocumentDuplicateIcon className="h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 text-gray-800 mt-3 font-light text-sm">
          <div className="border-t p-2 flex justify-center items-center gap-2">
            <PauseIcon className="h-6 " />
            <p>
              {previewAsset.luas} m<sup>2</sup>
            </p>
          </div>
          <div className="border-t border-l p-2 flex justify-center items-center gap-2">
            <p>{currencyFormatter(previewAsset.harga)}</p>
          </div>
          <div className="border-t p-2 flex justify-center items-center gap-2">
            <CalendarIcon className="h-6 " />
            <p>Per {dateTimeFormatter(previewAsset.tanggal_perolehan)}</p>
          </div>
          <div className="border-t border-l p-2 flex justify-center items-center gap-2">
            <CalendarIcon className="h-6 " />
            <p>
              Leg{" "}
              {previewAsset.tanggal_legalitas
                ? dateTimeFormatter(new Date())
                : "-"}
            </p>
          </div>
          <div className="border-y col-span-2 p-2 flex justify-center items-center gap-2">
            <DocumentIcon className="h-6 " />
            <p className="underline">Non Sertifikat</p>
          </div>
        </div>
      </div>
      <div
        onClick={() => handleCard()}
        className="py-3 px-1 bg-white rounded-r-md absolute right-0 translate-x-full top-1/2 -translate-y-1/2"
      >
        <ChevronLeftIcon
          className={`aspect-auto h-5 transition-transform duration-300 ${
            !showNav ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
    </div>
  ) : null;
};

export default SideCardDetail;
