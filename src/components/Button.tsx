import React from "react";
import "./button.scss";

export type ButtonProps = {
  handleButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}
function Button({handleButtonClick}: ButtonProps){

  return (
    <button type="button" onClick={handleButtonClick} className="btn">Submit</button>
  );
}

export default Button;
