import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './styles.module.css';
import { login } from '../../../utils/fetch';
import { setToken, getToken } from '../../../utils/storage';

import Button from '../../elements/Button';
import TextField from '../../fields/TextField';

export default function Login({ changeForm }) {
  const [state, setState] = useState({
    credential: '',
    password: '',
  });
  const [errors, setErrors] = useState(null);
  const { push } = useHistory();

  useEffect(() => {
    if (getToken()) push('/main/home');
  }, []);

  const handleChange = ({ target }) => {
    const newState = { ...state };
    newState[target.name] = target.value;
    setState(newState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.credential && state.password) {
      login(state)
        .then((res) => {
          setToken(res.data.accessToken);
          setErrors(null);
          push('/main/home');
        })
        .catch((err) => {
          setErrors(err.errors);
        });
    }
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
        {errors
          ? errors.map((err) => <span className={styles.error}>{err}</span>)
          : ''}
        <Button handleClick={handleSubmit} variant="primary">
          Masuk
        </Button>
        <p onClick={changeForm}>Belum punya akun? Yuk, daftar!</p>
      </div>
    </form>
  );
}
