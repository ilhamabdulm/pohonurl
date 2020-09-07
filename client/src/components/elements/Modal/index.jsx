import React from 'react';
import styles from './styles.module.css';

export default function Modal(props) {
  const { children, onClose, open } = props;
  const customClass = open
    ? [styles.root, styles.active].filter(Boolean).join(' ')
    : styles.root;

  console.log(customClass);

  return (
    <article className={customClass}>
      <div className={styles.overlay} onClick={onClose} />
      <section className={styles.content}>
        <p className={styles['close-symbol']} onClick={onClose}>
          &#10006;
        </p>
        {children}
      </section>
    </article>
  );
}
