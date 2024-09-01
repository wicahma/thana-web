import React from "react";

const MainInput = ({
  placeholder = "Masukkan teks",
  name,
  className,
  value,
  setValue,
  type = "text",
  disabled = false,
  error,
}) => {
  return (
    <div className="w-full">
      <div className={`flex gap-2 items-center ${className}`}>
        <p className="font-light text-sm">{name}</p>
        <input
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          className="border grow border-gray-500 rounded-md px-2 py-1 disabled:bg-gray-200"
          type={type}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default MainInput;
