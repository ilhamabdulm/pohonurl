import React, { useState } from 'react';
import styles from './styles.module.css';

import Button from '../../elements/Button';
import TextField from '../../fields/TextField';

export default function Register({ changeForm }) {
  const [state, setState] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const newState = { ...state };
    newState[target.name] = target.value;
    setState(newState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };

  return (
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
          name="email"
          label="Email"
          handleChange={handleChange}
        />
        <TextField
          inputProps={{
            placeholder: 'Username kamu',
            required: true,
          }}
          name="email"
          label="Username"
          handleChange={handleChange}
        />
        <TextField
          inputProps={{
            type: 'password',
            placeholder: 'Password kamu',
            required: true,
          }}
          hint="Password minimal 6 karakter"
          name="password"
          label="Password"
          handleChange={handleChange}
        />
        <Button handleClick={handleSubmit} variant="primary">
          Daftar
        </Button>
        <p onClick={changeForm}>Sudah punya akun? Langsung masuk di sini!</p>
      </div>
    </form>
  );
}
