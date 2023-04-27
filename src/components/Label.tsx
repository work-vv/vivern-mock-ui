import React from 'react';
import './label.scss';

export type LabelProps = {
  title: string;
  color?: string;
};

const Label = ({ title, color }: LabelProps) => {
  return <span className={`label label--${color || 'info'}`}>{title}</span>;
};

export default Label;
