import './form.scss'
import React from "react";

type InputProps = {
  title: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function FileInput({title, handleInputChange}: InputProps){

  return (
      <label className="button">{title}<input className="display-none" type="file"  /></label>
  );
}
export default FileInput
