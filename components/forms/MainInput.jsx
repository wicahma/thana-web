import React, { forwardRef } from "react";

const MainInput = forwardRef(
  (
    {
      placeholder = "Masukkan teks",
      name,
      className,
      inputClassName,
      value,
      setValue,
      type = "text",
      disabled = false,
      error,
      accept = "",
    },
    ref
  ) => {
    return (
      <div className="w-full h-full">
        <div className={`flex gap-2 items-center ${className}`}>
          {name && <p className="font-light text-sm">{name}</p>}
          <input
            value={value}
            ref={ref}
            accept={accept}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e) =>
              type === "file" ? setValue(e) : setValue(e.target.value)
            }
            className={`border grow border-gray-500 rounded-md px-2 py-1 disabled:bg-gray-200 ${inputClassName}`}
            type={type}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

export default MainInput;
