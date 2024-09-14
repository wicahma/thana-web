import React from "react";

const TextAreaInput = ({
  placeholder = "Masukkan teks",
  name,
  className,
  value,
  setValue,
  error,
}) => {
  return (
    <div className={`space-y-2 items-center ${className}`}>
      <p className="font-light text-sm">{name}</p>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className="border border-gray-500 rounded-md px-2 py-1 w-full"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TextAreaInput;
