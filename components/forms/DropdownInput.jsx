import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { useId, useRef, useState } from "react";

const DropdownInput = ({
  name,
  className,
  value,
  setValue,
  displayValues,
  keyValues,
  extraOption,
  disabled,
  error,
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
    <div className="w-full" >
      <div key={dropdownID} className={`flex gap-2 items-center ${className}`}>
        <label className="font-light text-sm break-keep text-nowrap">
          {name}
        </label>
        <div className="relative w-full">
          <div
            aria-disabled={disabled}
            onClick={!disabled ? handleDropdown : null}
            className={`border flex items-center ${
              disabled ? "bg-gray-200" : "bg-white"
            } justify-between cursor-pointer grow z-10 border-gray-500 rounded-md px-2 py-1 w-full ${
              value ? "text-gray-900" : "text-gray-400"
            }`}
          >
            <p className="line-clamp-1">{value ? value : "Pilih salah satu"}</p>
            <ChevronDownIcon
              className={`aspect-auto h-5 transition-transform duration-300 ${
                openDropdown ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          <div
            onClick={!disabled ? handleDropdown : null}
            className={`fixed top-0 z-20 left-0 w-screen h-screen ${
              openDropdown
                ? "animate-slide-in block"
                : "animate-slide-out hidden"
            }`}
          />
          {isRendered && (
            <div
              value={value}
              key={dropdownID}
              className={`absolute z-50 top-full w-full p-1 space-y-1 bg-white border border-gray-100 rounded-lg shadow-lg ${
                openDropdown ? "animate-slide-in" : "animate-slide-out"
              }`}
            >
              {extraOption}
              {displayValues.constructor === Array &&
                displayValues.map((val, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setValue(keyValues[i]);
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default DropdownInput;
