import React from "react";

const RadioInput = ({
  name,
  className,
  value,
  setValue,
  displayValues,
  keyValues,
  error,
}) => {
  return (
    <div>
      <div className={`space-y-2 ${className}`}>
        <p className="font-light text-sm">{name}</p>
        <fieldset className="break-keep text-nowrap" id={name}>
          {displayValues.constructor === Array &&
            displayValues.map((val, i) => (
              <div key={`${i}-${val}`}>
                <label
                  htmlFor={val}
                  onClick={() => setValue(keyValues[i])}
                  className="flex gap-3 w-fit"
                >
                  <input
                    value={keyValues[i]}
                    name={name}
                    onChange={() => setValue(keyValues[i])}
                    className="border grow border-gray-500 rounded-md px-2 py-1"
                    type="radio"
                    checked={value === keyValues[i]}
                  />
                  {val}
                </label>
              </div>
            ))}
        </fieldset>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default RadioInput;
