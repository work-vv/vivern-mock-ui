import React from 'react';
import './button.scss';

export type ButtonProps = {
  title: string;
  classname?: string;
  handleButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
const Button = ({ title, classname, handleButtonClick }: ButtonProps) => {
  return (
    <button type="button" onClick={handleButtonClick} className={`button ${classname}`}>
      {title}
    </button>
  );
};

export default Button;
