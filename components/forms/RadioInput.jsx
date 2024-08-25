import React from "react";

const RadioInput = ({ name, className, value, setValue, initValues }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <p className="font-light text-sm">{name}</p>
      <fieldset className="break-keep text-nowrap" onChange={(e) => setValue(e.target.value)} id={name}>
        {initValues.constructor === Object &&
          Object.entries(initValues).map(([key, val], i) => (
            <div key={`${i}-${key}`} className="flex gap-3 w-fit">
              <input
                value={val}
                name={name}
                className="border grow border-gray-500 rounded-md px-2 py-1"
                type="radio"
              />
              <label htmlFor={val}>{val}</label>
            </div>
          ))}
        {initValues.constructor === Array &&
          initValues.map((val, i) => (
            <div key={`${i}-${val}`}>
              <input
                value={val}
                name={name}
                className="border grow border-gray-500 rounded-md px-2 py-1"
                type="radio"
              />
              <label htmlFor={val}>{val}</label>
            </div>
          ))}
      </fieldset>
    </div>
  );
};

export default RadioInput;
