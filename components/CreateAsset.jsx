import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import React from "react";
import { DropdownInput, MainInput, RadioInput, TextAreaInput } from "./forms";
import {
  BookmarkSquareIcon,
  MapPinIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

const CreateAsset = ({ closeCallback }) => {
  return (
    <div
      onClick={(e) => closeCallback(true)}
      className="fixed z-[1100] text-base w-screen h-screen top-0 flex justify-end left-0 bg-black/50"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`bg-white rounded-s-xl max-w-[50%] w-full relative overflow-hidden transition-all duration-500`}
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
          <div className="p-3 space-y-2">
            <h3 className="text-base font-semibold">Informasi Umum</h3>
            <MainInput
              name="Penggunaan"
              className="w-full"
              placeholder={"Masukkan Tujuan Penggunaan"}
              setValue={(e) => console.log(e)}
            />
            <div className="flex gap-3">
              <DropdownInput
                name="SKPD"
                className="w-full"
                initValues={[1, 2, 3]}
                setValue={(e) => console.log(e)}
              />
              <MainInput
                name="No. KIB"
                placeholder={"Masukkan No. KIB"}
                className="w-full"
                setValue={(e) => console.log(e)}
              />
            </div>
            <div className="flex gap-3">
              <MainInput
                name="Kode Barang"
                placeholder={"Masukkan Kode Barang"}
                className="w-full"
                setValue={(e) => console.log(e)}
              />
              <MainInput
                name="Uraian"
                placeholder={"Berikan uraian singkat"}
                className="w-full"
                setValue={(e) => console.log(e)}
              />
            </div>
            <div className="flex gap-3">
              <MainInput
                name="Tgl Perolehan"
                placeholder={"Masukkan Tanggal"}
                className="w-full"
                type="date"
                setValue={(e) => console.log(e)}
              />
              <MainInput
                name="Luas"
                placeholder={"Masukkan Luas"}
                className="w-full"
                type="number"
                setValue={(e) => console.log(e)}
              />
            </div>
            <MainInput
              name="Alamat"
              placeholder={"Masukkan Alamat"}
              className="w-full"
              setValue={(e) => console.log(e)}
            />
            <div className="flex gap-3">
              <DropdownInput
                name="Asal Usul"
                initValues={{ 1: "Januari", 2: "Februari", 3: "Maret" }}
                className="w-full"
                setValue={(e) => console.log(e)}
              />
              <MainInput
                name="Harga"
                placeholder={"Masukkan Luas"}
                className="w-full"
                type="number"
                setValue={(e) => console.log(e)}
              />
            </div>
            <div className="flex gap-3">
              <DropdownInput
                name="Kategori"
                initValues={{ 1: "Januari", 2: "Februari", 3: "Maret" }}
                className="w-full"
                setValue={(e) => console.log(e)}
              />
              <MainInput
                name="Fungsi"
                placeholder={"Jelasakan Fungsi"}
                className="w-full"
                setValue={(e) => console.log(e)}
              />
            </div>
            <div className="flex gap-3">
              <MainInput
                name="Desa"
                placeholder={"Masukkan Desa"}
                className="w-full"
                setValue={(e) => console.log(e)}
              />
              <DropdownInput
                name="Kecamatan"
                initValues={{
                  1: "Kotabaru",
                  2: "Banjarbaru",
                  3: "Banjarmasin",
                }}
                className="w-full"
                setValue={(e) => console.log(e)}
                extraOption={
                  <div className="bg-red-400">
                    <MainInput
                      name=""
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
              setValue={(e) => console.log(e)}
            />
            <h3 className="text-base font-semibold pt-5">Legalitas</h3>
            <div className="flex gap-3">
              <DropdownInput
                name="Legalitas"
                initValues={{
                  1: "Legal",
                  2: "Ilegal",
                  3: "Sengketa",
                }}
                className="w-full"
                setValue={(e) => console.log(e)}
              />
              <MainInput
                name="Tgl Legalitas"
                className="w-full"
                type="date"
                setValue={(e) => console.log(e)}
              />
            </div>
            <div className="flex gap-3">
              <MainInput
                name="No. Legalitas"
                placeholder={"Masukkan No. Legalitas"}
                className="w-full"
                setValue={(e) => console.log(e)}
              />
              <MainInput
                name="PDF Legalitas"
                placeholder={"PDF Legalitas"}
                className="w-full"
                type="file"
                setValue={(e) => console.log(e)}
              />
            </div>
            <h3 className="text-base font-semibold pt-5">
              Status dan Penggunaan
            </h3>
            <div className="flex gap-3">
              <DropdownInput
                name="Uraian Kasus"
                initValues={{
                  1: "Legal",
                  2: "Ilegal",
                  3: "Sengketa",
                }}
                className="w-full"
                setValue={(e) => console.log(e)}
              />
              <MainInput
                name="Penggunaan"
                placeholder={"Masukkan Penggunaan"}
                className="w-full"
                setValue={(e) => console.log(e)}
              />
            </div>
            <div className="flex gap-3">
              <RadioInput
                name="Kasus"
                initValues={{ true: "Ada", false: "Tidak Ada" }}
                setValue={(e) => console.log("Result: ", e)}
              />
              <RadioInput
                name="Pemanfaatan"
                initValues={{ true: "Digunakan", false: "Tidak Digunakan" }}
                setValue={(e) => console.log("Result: ", e)}
              />
              <TextAreaInput
                name="Keterangan lainnya"
                placeholder={"Masukkan Penggunaan"}
                className="w-full"
                setValue={(e) => console.log(e)}
              />
            </div>
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
              <div className="bg-sky-500 flex justify-center items-center gap-1 w-fit transition-colors hover:bg-sky-600 rounded-lg px-3 py-1 text-sm font-normal cursor-pointer text-white">
                <MapPinIcon className="h-4 aspect-auto" />
                <p>Pilih dari peta</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <MainInput
                  name="Latitude"
                  placeholder={"Masukkan Latitude"}
                  className="w-full"
                  setValue={(e) => console.log(e)}
                />
                <MainInput
                  name="Longitude"
                  placeholder={"Masukkan Longitude"}
                  className="w-full"
                  setValue={(e) => console.log(e)}
                />
                <button className="aspect-square p-2 bg-red-500 rounded-lg h-9 text-red-100 transition-colors hover:bg-red-600 hover:text-red-200">
                  <TrashIcon className="h-full aspect-auto" />
                </button>
              </div>
              <button className="flex hover:bg-gray-400 hover:text-white transition-colors rounded-lg items-center justify-center gap-3 h-10 border text-gray-400 border-gray-400 border-dashed w-full">
                <PlusIcon className="aspect-auto h-full " />
                <p>Tambah Koordinat</p>
              </button>
            </div>
            <button className="h-10 w-full mt-5 rounded-lg bg-sky-400 flex gap-2 text-white justify-center items-center transition-colors hover:bg-sky-500">
              <BookmarkSquareIcon className="aspect-auto h-full py-2" />
              <p>Buat Asset</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAsset;
