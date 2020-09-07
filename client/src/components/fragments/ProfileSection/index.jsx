import React, { useState } from 'react';

import styles from './styles.module.css';
import { DEMO_PHOTO } from '../../../config/images';

import Button from '../../elements/Button';
import TextField from '../../fields/TextField';

export const ProfileSection = () => {
  const [isEdit, setEdit] = useState(false);

  return (
    <section className={styles['profile-section']}>
      <figure>
        <img alt="prof-pic" src={DEMO_PHOTO} />
      </figure>
      <div>
        <TextField
          inputProps={{ disabled: !isEdit, defaultValue: 'Ilham Abdul Malik' }}
          name="name"
          label="Nama Lengkap"
        />
        <TextField
          inputProps={{ disabled: !isEdit, defaultValue: 'ilhammarzlik' }}
          name="username"
          label="Username"
        />
      </div>
      <div className={styles['profile-action']}>
        {isEdit ? (
          <>
            {' '}
            <Button handleClick={() => setEdit(false)} variant="danger">
              Batal
            </Button>
            <Button variant="primary">Simpan</Button>
          </>
        ) : (
          <Button handleClick={() => setEdit(true)} variant="secondary">
            Ubah Data
          </Button>
        )}
      </div>
    </section>
  );
};
