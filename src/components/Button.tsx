import React from 'react';
import './button.scss';

export type ButtonProps = {
  title: string;
  handleButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
const Button = ({ title, handleButtonClick }: ButtonProps) => {
  return (
    <button type="button" onClick={handleButtonClick} className="button">
      {title}
    </button>
  );
};

export default Button;
