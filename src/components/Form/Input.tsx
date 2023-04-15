import './form.scss'
import React from "react";

type InputProps = {
  inputName: string,
  inputValue: string|number,
  inputPlaceholder: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({inputName, inputValue, inputPlaceholder, handleInputChange}: InputProps){

  return (
    <input className="form__input" type="text" value={inputValue} name={inputName} placeholder={inputPlaceholder} onChange={handleInputChange} />
  );
}
export default Input
