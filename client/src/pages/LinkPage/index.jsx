import React from 'react';
import styles from './styles.module.css';
import { useParams } from 'react-router-dom';

import { DEMO_PHOTO } from '../../config/images';
import LinkCard from '../../components/fragments/LinkCard';

export default function LinkPage({ userProps }) {
  const { username } = useParams();

  return (
    <main className={styles.root}>
      <article className={styles.content}>
        <header>
          <img alt="profpic" className={styles.profpic} src={DEMO_PHOTO} />
          <h3>@{username ? username : userProps}</h3>
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
