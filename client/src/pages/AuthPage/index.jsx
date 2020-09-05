import React, { useState } from 'react';
import styles from './styles.module.css';

import { ILLU_SHARE } from '../../config/images';

import TextField from '../../components/fields/TextField';
import Button from '../../components/elements/Button';

export default function AuthPage() {
  const [isLogin, setLogin] = useState(true);

  return (
    <main className={styles.root}>
      <figure className={styles['hero-banner']}>
        <img alt="illu-share" src={ILLU_SHARE} />
        <figcaption>
          <h2>Cuma bisa pasang satu URL di bio sosial media kamu?</h2>
          <h1>PohonUrl bisa jadi solusi buat kamu!</h1>
          <h3>Yuk, kelola link kamu bersama kami! Gratis kok!</h3>
        </figcaption>
      </figure>
      <aside className={styles['auth-area']}>
        <section className={styles.box}>
          {isLogin ? (
            <Login changeForm={() => setLogin(false)} />
          ) : (
            <p onClick={() => setLogin(true)}>Login</p>
          )}
        </section>
      </aside>
    </main>
  );
}

export const Login = ({ changeForm }) => {
  const [state, setState] = useState({
    credential: '',
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
};
