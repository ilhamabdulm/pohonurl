import React from 'react';
import styles from './styles.module.css';

export default function TextField(props) {
  const { inputProps, label, name, handleChange, hint } = props;

  return (
    <label className={styles['form-input']}>
      {label}
      <input type="text" name={name} onChange={handleChange} {...inputProps} />
      {hint && <span className={styles.hint}>{hint}</span>}
    </label>
  );
}
