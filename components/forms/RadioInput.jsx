import React from "react";

const RadioInput = ({
  placeholder = "Masukkan teks",
  name,
  className,
  value,
  setValue,
  type = "text",
}) => {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      <p className="font-light text-sm">{name}</p>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className="border grow border-gray-500 rounded-md px-2 py-1"
        type={type}
      />
    </div>
  );
};

export default RadioInput;
