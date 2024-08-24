import React from "react";

const DropdownInput = ({ name, className, value, setValue, initValues }) => {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      <label className="font-light text-sm">{name}</label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border grow border-gray-500 bg-white rounded-md px-2 py-2"
      >
        {initValues.constructor === Object &&
          Object.entries(initValues).map(([key, val], i) => (
            <option key={`${i}-${key}`} value={key}>
              {val}
            </option>
          ))}
        {initValues.constructor === Array &&
          initValues.map((val, i) => (
            <option key={i} value={val}>
              {val}
            </option>
          ))}
      </select>
    </div>
  );
};

export default DropdownInput;
