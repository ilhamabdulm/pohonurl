import React from 'react';
import styles from './styles.module.css';

export default function TextField(props) {
  const { inputProps, label, name, handleChange, hint, errors } = props;

  return (
    <label className={styles['form-input']}>
      {label}
      <input type="text" name={name} onChange={handleChange} {...inputProps} />
      {hint && !errors && <span className={styles.hint}>{hint}</span>}
      {errors && (
        <span className={styles.error}>
          {errors[name] ? errors[name].message : null}
        </span>
      )}
    </label>
  );
}
