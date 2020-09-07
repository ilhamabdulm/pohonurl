import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './styles.module.css';

import Button from '../../elements/Button';
import TextField from '../../fields/TextField';

export default function Login({ changeForm }) {
  const [state, setState] = useState({
    credential: '',
    password: '',
  });
  const { push } = useHistory();

  const handleChange = ({ target }) => {
    const newState = { ...state };
    newState[target.name] = target.value;
    setState(newState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.credential && state.password) push('/main/home');
  };

  return (
    <form className={styles['login-form']}>
      <header>
        <h1>Login</h1>
      </header>
      <div>
        <TextField
          inputProps={{
            placeholder: 'Email atau username kamu',
            required: true,
          }}
          name="credential"
          label="Username atau Email"
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
          Masuk
        </Button>
        <p onClick={changeForm}>Belum punya akun? Yuk, daftar!</p>
      </div>
    </form>
  );
}
