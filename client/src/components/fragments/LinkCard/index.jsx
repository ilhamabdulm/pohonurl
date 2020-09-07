import React from 'react';
import styles from './styles.module.css';

export default function LinkCard({ name }) {
  return (
    <div className={styles['link-card']}>
      <h3>{name}</h3>
    </div>
  );
}
