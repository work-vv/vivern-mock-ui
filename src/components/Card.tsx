import './card.scss';
import React from 'react';

type CardProps = {
  title: string;
  description?: string;
};
const Card = ({ title, description }: CardProps) => {
  return (
    <div className="card">
      <div className="card__info">
        <h3 className="card__title">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default Card;
