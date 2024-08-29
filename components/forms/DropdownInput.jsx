import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { useId, useRef, useState } from "react";

const DropdownInput = ({
  name,
  className,
  value,
  setValue,
  initValues,
  extraOption,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const dropdownID = useId();

  const handleDropdown = () => {
    if (openDropdown) {
      setOpenDropdown(false);
      setTimeout(() => setIsRendered(false), 300);
    } else {
      setIsRendered(true);
      setTimeout(() => setOpenDropdown(true), 10);
    }
  };
  return (
    <div key={dropdownID} className={`flex gap-2 items-center ${className}`}>
      <label className="font-light text-sm break-keep text-nowrap">
        {name}
      </label>
      <div className="relative w-full">
        <div
          onClick={handleDropdown}
          className={`border flex items-center justify-between cursor-pointer grow z-10 border-gray-500 bg-white rounded-md px-2 py-1 w-full ${
            openDropdown ? "text-gray-900" : "text-gray-400"
          }`}
        >
          <p>{openDropdown ? value ?? "Memilih" : "Pilih salah satu"}</p>
          <ChevronDownIcon
            className={`aspect-auto h-5 transition-transform duration-300 ${
              openDropdown ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <div
          onClick={handleDropdown}
          className={`fixed top-0 z-20 left-0 w-screen h-screen ${
            openDropdown ? "animate-slide-in block" : "animate-slide-out hidden"
          }`}
        />
        {isRendered && (
          <div
            value={value}
            key={dropdownID}
            className={`absolute z-20 top-full w-full p-1 space-y-1 bg-white border border-gray-100 rounded-lg shadow-lg ${
              openDropdown ? "animate-slide-in" : "animate-slide-out"
            }`}
          >
            {initValues.constructor === Object &&
              Object.entries(initValues).map(([key, val], i) => (
                <div
                  key={`${i}-${key}`}
                  onChange={() => {
                    setValue(val);
                    handleDropdown();
                  }}
                  className="px-2 py-1 border rounded-md transition-colors hover:bg-gray-100 cursor-pointer"
                >
                  {val}
                </div>
              ))}
            {initValues.constructor === Array &&
              initValues.map((val, i) => (
                <div
                  key={i}
                  onChange={() => {
                    setValue(val);
                    handleDropdown();
                  }}
                  className="px-2 py-1 border rounded-md transition-colors hover:bg-gray-100 cursor-pointer"
                >
                  {val}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownInput;
