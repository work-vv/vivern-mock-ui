import './input.scss'
import React, {ChangeEvent} from "react";

type InputProps = {
  inputName: string,
  inputValue: string,
  inputPlaceholder: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function InputField({inputName, inputValue, inputPlaceholder, handleInputChange}: InputProps){

  return (
    <input className="form-input" type="text" value={inputValue} name={inputName} placeholder={inputPlaceholder} onChange={handleInputChange} />
  );
}
export default InputField
