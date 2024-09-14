import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { assetSchema } from "../../helper/validator";
import FormUpdateAsset from "../forms/FormUpdateAsset";
import { initAsset } from "../../helper/constant";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectLogin } from "../../store/features/auth/authSlice";
import {
  checkAssetLoading,
  hidePanel,
  selectHidePanel,
  selectMapPolygonUpdate,
  setAdminDetailUpdateAsync,
  setListAssetAsync,
  updateAssetAsync,
} from "../../store/features/asset/assetSlice";

const ModalEditAsset = ({ id, closeCallback }) => {
  const dispatch = useAppDispatch();
  const isHidden = useAppSelector(selectHidePanel);
  const { update_asset_status, edit_asset_status } =
    useAppSelector(checkAssetLoading);
  const mapPolygon = useAppSelector(selectMapPolygonUpdate);
  
  const [fileError, setFileError] = useState({ pdf: "", foto1: "", foto2: "" });


  const handleDoneEdit = (values, action) => {
    if (values.pdf_legalitas === undefined) {
      setFileError({ pdf: "PDF Legalitas wajib diisi" });
      return;
    }
    if (values.foto_1 === undefined) {
      setFileError({ foto1: "Foto 1 wajib diisi" });
      return;
    }
    if (values.foto_2 === undefined) {
      setFileError({ foto2: "Foto 2 wajib diisi" });
      return;
    }
    console.log("datanay ", values);
    dispatch(
      updateAssetAsync({
        ...values,
        koordinats: {
          type: "Polygon",
          coordinates: [[...mapPolygon.coordinates, mapPolygon.coordinates[0]]],
        },
      })
    ).then((res) => {
      if (res.payload.status) {
        closeCallback();
        dispatch(setListAssetAsync());
      }
    });
    return false;
  };

  const handleHidePanel = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("handleHidePanel");
    if (isHidden) {
      setTimeout(() => dispatch(hidePanel(false)), 10);
    } else {
      setTimeout(() => dispatch(hidePanel(true)), 10);
    }
  };

  useEffect(() => {
    if (id !== null) {
      dispatch(setAdminDetailUpdateAsync(id));
    }
  }, [id]);

  return id !== null && edit_asset_status.includes("idle") ? (
    <div>
      <div
        onClick={closeCallback}
        className={`fixed transition-all duration-300 w-full h-full bg-black backdrop-blur-sm bg-opacity-50 z-[1100] ${
          isHidden ? "left-0 -top-full" : "top-0 left-0"
        }`}
      ></div>
      <div
        className={`fixed transition-all duration-300 overflow-hidden transform ${
          isHidden
            ? "-translate-x-1/2 -top-full left-1/2"
            : "-translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        } bg-white rounded-lg z-[1101]`}
      >
        <Formik
          initialValues={initAsset}
          validationSchema={assetSchema}
          onSubmit={handleDoneEdit}
          validateOnChange={true}
        >
          {({ isSubmitting, errors, values, setFieldValue }) => (
            <Form>
              <div className="px-3 border-b py-2">
                <h1 className="text-2xl grow font-semibold pe-3">
                  Mengedit asset
                </h1>
              </div>
              <div className="overflow-y-scroll h-full max-h-[80vh]">
                <FormUpdateAsset hidePanelCallback={handleHidePanel} fileError={fileError} setFileError={setFileError} />
              </div>
              <div className="flex justify-end w-full h-10">
                <button
                  type="submit"
                  onClick={() => {
                    console.log(errors);
                  }}
                  className="bg-lime-500 flex gap-2 justify-center items-center text-white rounded-tl-lg hover:bg-lime-600 transition-colors px-5 py-1 w-fit"
                >
                  {update_asset_status.includes("loading") && (
                    <div className="loader border-white" />
                  )}
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={closeCallback}
                  className="bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors px-5 py-1 w-fit"
                >
                  Batal
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  ) : undefined;
};

export default ModalEditAsset;
