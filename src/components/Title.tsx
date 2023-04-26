import React from 'react';
import './title.scss';

type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
  return (
    <div className="Title">
      <h2 className="Title__text">{title}</h2>
    </div>
  );
};

export default Title;
