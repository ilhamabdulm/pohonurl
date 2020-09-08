import React, { useState } from 'react';
import styles from './styles.module.css';

import Button from '../../elements/Button';
import TextField from '../../fields/TextField';
import { register } from '../../../utils/fetch';
import ModalSuccess from '../../fragments/ModalSuccess';

export default function Register({ changeForm }) {
  const [state, setState] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState(null);
  const [successModal, setSuccessModal] = useState(false);

  const handleChange = ({ target }) => {
    const newState = { ...state };
    newState[target.name] = target.value;
    setState(newState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    register(state)
      .then((response) => {
        if (response.success) {
          setSuccessModal(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.errors);
      });
  };

  return (
    <>
      <form className={styles['register-form']}>
        <header>
          <h1>Register</h1>
        </header>
        <div>
          <TextField
            inputProps={{
              placeholder: 'Email aktif kamu ya',
              required: true,
            }}
            errors={errors}
            name="email"
            label="Email"
            handleChange={handleChange}
          />
          <TextField
            inputProps={{
              placeholder: 'Username kamu',
              required: true,
            }}
            errors={errors}
            name="username"
            label="Username"
            handleChange={handleChange}
          />
          <TextField
            inputProps={{
              type: 'password',
              placeholder: 'Password kamu',
              required: true,
            }}
            errors={errors}
            hint="Password minimal 6 karakter"
            name="password"
            label="Password"
            handleChange={handleChange}
          />
          {errors &&
            errors.map((err) => <span className={styles.error}>{err}</span>)}
          <Button handleClick={handleSubmit} variant="primary">
            Daftar
          </Button>
          <p onClick={changeForm}>Sudah punya akun? Langsung masuk di sini!</p>
        </div>
      </form>
      <ModalSuccess
        message="Pendaftaran berhasil, silakan login"
        open={successModal}
        onClose={() => setSuccessModal(false)}
        action={() => {
          setSuccessModal(false);
          changeForm();
        }}
      />
    </>
  );
}
