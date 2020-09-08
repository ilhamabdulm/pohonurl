import React from 'react';
import styles from './styles.module.css';

export default function LinkCard({ name, link }) {
  const handleLink = () => window.open(link, '_blank');

  return (
    <div className={styles['link-card']} onClick={handleLink}>
      <h3>{name}</h3>
    </div>
  );
}
