"use client";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useMemo, useState } from "react";
import {
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import * as yup from "yup";

const Login = () => {
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Masukkan email yang sesuai")
      .required("Email wajib diisi"),
    password: yup
      .string()
      .min(5, "Password minimal 5 huruf")
      .required("Password wajib diisi"),
  });
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="fixed flex justify-center items-center z-[500] bg-black/50 h-screen w-screen top-0 left-0">
      <div className="p-3 bg-white rounded-xl w-80">
        <h1 className="text-xl font-semibold text-center mb-3">
          Phantox Negara
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(val, action) => {
            console.log(val);
            return true;
          }}
          validateOnChange={true}
        >
          {({ isSubmitting, errors, values, setFieldValue }) => (
            <Form className="space-y-2">
              <div
                className={`bg-white text-base h-11 rounded-xl border ${
                  errors.email ? "border-red-500" : "border-gray-200"
                } overflow-hidden flex`}
              >
                <div className="aspect-square h-full p-3">
                  <AtSymbolIcon
                    className={`aspect-auto ${
                      errors.email ? "text-red-400" : "text-gray-400"
                    } h-full`}
                  />
                </div>
                <input
                  placeholder="Email"
                  value={values.email}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  className={`grow ${
                    errors.email ? "text-red-400" : "text-gray-800"
                  }`}
                  type="text"
                />
              </div>
              <p className="text-red-500 mx-4">{errors.email}</p>
              <div
                className={`bg-white text-base h-11 rounded-xl border ${
                  errors.password ? "border-red-500" : "border-gray-200"
                } overflow-hidden flex`}
              >
                <div className="aspect-square h-full p-3">
                  <KeyIcon
                    className={`aspect-auto ${
                      errors.password ? "text-red-400" : "text-gray-400"
                    } h-full`}
                  />
                </div>
                <input
                  placeholder="Password"
                  value={values.password}
                  className={`grow ${
                    errors.password ? "text-red-400" : "text-gray-800"
                  }`}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  type={showPassword ? "text" : "password"}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className={`aspect-square h-full p-3 ${
                    errors.password ? "text-red-400" : "text-gray-400"
                  }`}
                >
                  {showPassword ? (
                    <EyeIcon className="aspect-auto h-full" />
                  ) : (
                    <EyeSlashIcon className="aspect-auto h-full" />
                  )}
                </div>
              </div>
              <p className="text-red-500 mx-4">{errors.password}</p>

              <button
                type="submit"
                className="rounded-xl bg-orange-500 w-full py-2 text-base mt-5 transition-colors hover:bg-orange-600 text-gray-50"
              >
                MASUK
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
