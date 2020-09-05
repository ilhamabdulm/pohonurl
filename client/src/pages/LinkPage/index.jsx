import React from 'react';
import styles from './styles.module.css';
import { useParams } from 'react-router-dom';

import { DEMO_PHOTO } from '../../config/images';

export default function LinkPage() {
  const { username } = useParams();

  return (
    <main className={styles.root}>
      <article className={styles.content}>
        <header>
          <img alt="profpic" className={styles.profpic} src={DEMO_PHOTO} />
          <h3>@{username}</h3>
          <h4>Ilham Abdul Malik</h4>
        </header>
        <section>
          <LinkCard name="Instagram" />
          <LinkCard name="Twitter" />
        </section>
        <footer>
          <h6>Yuk bikin juga! Klik di sini.</h6>
          <p>&copy; PohonUrl | 2020</p>
        </footer>
      </article>
    </main>
  );
}

export const LinkCard = ({ name }) => {
  return (
    <div className={styles['link-card']}>
      <h3>{name}</h3>
    </div>
  );
};
