import React from 'react';
import './Input.css';

export const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`input ${className}`}
      {...props}
    />
  );
}; 