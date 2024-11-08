import React from 'react';
import './Button.css';

export const Button = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  disabled = false,
  ...props 
}) => {
  return (
    <button 
      className={`button ${variant} ${size} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}; 