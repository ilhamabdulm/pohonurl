import React, { useState } from 'react';
import styles from './styles.module.css';

import ModalConfirmation from '../ModalConfirmation';

export default function LinkDetails({ data, handleDelete, handleEdit }) {
  const [modalDelete, setModalDelete] = useState(false);

  return (
    <>
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
          <p onClick={() => setModalDelete(true)}>Delete</p>
        </div>
      </div>
      <ModalConfirmation
        message="Apakah kamu yakin untuk menghapus link ini?"
        onClose={() => setModalDelete(false)}
        action={() => {
          setModalDelete(false);
          handleDelete(data._id);
        }}
        open={modalDelete}
      />
    </>
  );
}
