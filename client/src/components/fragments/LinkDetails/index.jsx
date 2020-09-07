import React from 'react';
import styles from './styles.module.css';

export default function LinkDetails({ data, handleDelete, handleEdit }) {
  return (
    <div className={styles['link-card']}>
      <div className={styles['link-card-name']}>
        <h6>{data.linkName}</h6>
        <h5>
          {data.linkUrl.startsWith('https') || data.linkUrl.startsWith('http')
            ? data.linkUrl
            : `https://${data.linkUrl}`}
        </h5>
      </div>
      <div className={styles['link-card-action']}>
        <p onClick={() => handleEdit(data)}>Edit</p>
        <p onClick={() => handleDelete(data.id)}>Delete</p>
      </div>
    </div>
  );
}
