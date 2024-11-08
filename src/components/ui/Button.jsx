import React from 'react';
import './Button.css';

export const Button = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  ...props 
}) => {
  return (
    <button 
      className={`button ${variant} ${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}; 