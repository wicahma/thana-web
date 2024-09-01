import React from "react";
import { useAppDispatch } from "../../store/hooks";
import {
  deleteAssetAsync,
  setListAssetAsync,
} from "../../store/features/asset/assetSlice";

const ModalDeleteAsset = ({ id, closeCallback }) => {
  const dispatch = useAppDispatch();

  const handleDeleteAsset = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteAssetAsync(id)).then(() => {
      dispatch(setListAssetAsync());
      closeCallback();
    });
  };

  return id !== null ? (
    <div>
      <div
        onClick={closeCallback}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1000]"
      ></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-lg z-[1001]">
        <p className="text-center text-xl">Hapus aset?</p>
        <p className="text-center text-sm">
          Aset yang dihapus tidak dapat dikembalikan lagi
        </p>
        <div className="flex justify-center gap-3 mt-3">
          <button
            onClick={handleDeleteAsset}
            className="bg-red-500 text-white hover:bg-red-600 transition-colors rounded-md px-3 py-1"
          >
            Hapus
          </button>
          <button
            onClick={closeCallback}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors rounded-md px-3 py-1"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  ) : undefined;
};

export default ModalDeleteAsset;
