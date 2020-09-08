import React, { useState } from 'react';
import styles from './styles.module.css';

import { ILLU_SHARE } from '../../config/images';

import Login from '../../components/forms/Login';
import Register from '../../components/forms/Register';

export default function AuthPage() {
  const [isLogin, setLogin] = useState(true);

  return (
    <main className={styles.root}>
      <figure className={styles['hero-banner']}>
        <img alt="illu-share" src={ILLU_SHARE} />
        <figcaption>
          <h3>Cuma bisa pasang satu URL di bio sosial media kamu?</h3>
          <h2>JadiSatu.in aja semua di sini!</h2>
          <h4>Yuk, kelola link kamu bersama kami! Gratis kok!</h4>
        </figcaption>
      </figure>
      <aside className={styles['auth-area']}>
        <section className={styles.box}>
          {isLogin ? (
            <Login changeForm={() => setLogin(false)} />
          ) : (
            <Register changeForm={() => setLogin(true)} />
          )}
        </section>
      </aside>
    </main>
  );
}
