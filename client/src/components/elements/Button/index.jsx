import React from 'react';
import styles from './styles.module.css';

export default function Button(props) {
  const { children, isDisabled, handleClick, type, variant } = props;
  const customClass = [styles.button, styles[variant]]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={customClass}
      disabled={isDisabled}
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
}
