import React, { useState, useContext, useEffect } from 'react';

import styles from './styles.module.css';
import { AppContext } from '../../../contexts';
import { DEMO_PHOTO } from '../../../config/images';

import Button from '../../elements/Button';
import TextField from '../../fields/TextField';
import { updateUser, userDetail } from '../../../utils/fetch';
import ModalSuccess from '../ModalSuccess';

export default function ProfileSection() {
  const [isEdit, setEdit] = useState(false);
  const [state, setState] = useState({
    name: '',
    username: '',
  });
  const [openModal, setOpenModal] = useState(false);
  const { userDetails } = useContext(AppContext);

  useEffect(() => userDetails && setState(userDetails), [userDetails]);

  const handleChange = ({ target }) => {
    const newState = { ...state };
    newState[target.name] = target.value;
    setState(newState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(state)
      .then(() => {
        return userDetail();
      })
      .then(() => {
        setOpenModal(true);
      })
      .catch((err) => console.log(err));
  };

  const handleCloseModal = () => {
    setEdit(false);
    setOpenModal(false);
  };

  return (
    <section className={styles['profile-section']}>
      <figure>
        <img alt="prof-pic" src={DEMO_PHOTO} />
      </figure>
      <div>
        <TextField
          inputProps={{ disabled: !isEdit, defaultValue: state.name }}
          name="name"
          label="Nama Lengkap"
          handleChange={handleChange}
        />
        <TextField
          inputProps={{ disabled: !isEdit, defaultValue: state.username }}
          name="username"
          label="Username"
          handleChange={handleChange}
        />
      </div>
      <div className={styles['profile-action']}>
        {isEdit ? (
          <>
            {' '}
            <Button handleClick={() => setEdit(false)} variant="danger">
              Batal
            </Button>
            <Button handleClick={handleSubmit} variant="primary">
              Simpan
            </Button>
          </>
        ) : (
          <Button handleClick={() => setEdit(true)} variant="secondary">
            Ubah Data
          </Button>
        )}
      </div>
      <ModalSuccess
        open={openModal}
        onClose={handleCloseModal}
        message="Berhasil mengubah data! Terima kasih"
        action={handleCloseModal}
      />
    </section>
  );
}
