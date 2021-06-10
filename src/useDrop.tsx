import React, { useState, FunctionComponent, Dispatch } from "react";

const useDrop = (label: string, defaultState: string, options: string[]) => {
  const [state, updateState] = useState(defaultState);
  const id = `use-drop-${label.replace(" ", "").toLowerCase()}`;

  const Dropdown: FunctionComponent = () => (
    <label htmlFor={id}>
      {label}
      <select
        id={id}
        value={state}
        onChange={(e) => updateState(e.target.value)}
        onBlur={(e) => updateState(e.target.value)}
        disabled={options.length === 0}
      >
        <option>All</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );

  return [state, Dropdown, updateState] as [string, FunctionComponent, Dispatch<string>];
}
export default useDrop;