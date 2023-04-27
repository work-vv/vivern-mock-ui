import './form.scss';
import React, { ChangeEvent } from 'react';

type SelectProps = {
  selectName: string;
  selectValue: string;
  selectOptions: any;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function Select({ selectName, selectValue, selectOptions, handleSelectChange }: SelectProps) {
  return (
    <select
      className="form__input"
      name={selectName}
      value={selectValue}
      onChange={(e) => {
        // @ts-ignore
        handleSelectChange(e);
      }}
    >
      {Object.keys(selectOptions).map((key) => (
        <option key={key} value={key}>
          {selectOptions[key]}
        </option>
      ))}
    </select>
  );
}

export default Select;
