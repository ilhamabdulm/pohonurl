import React, { useEffect, useState, useContext } from 'react';
import styles from './styles.module.css';
import { useParams } from 'react-router-dom';

import { DEFAULT_PROFPIC } from '../../config/images';
import LinkCard from '../../components/fragments/LinkCard';
import { getUserLinks } from '../../utils/fetch';
import { AppContext } from '../../contexts';

export default function LinkPage() {
  const [links, setLinks] = useState([]);
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState('');
  const { username } = useParams();
  const { userDetails } = useContext(AppContext);

  useEffect(() => {
    const params = username ? username : userDetails.username;
    getUserLinks(params)
      .then((res) => {
        if (res.success) {
          setErrors('');
          setLinks(res.data.links);
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        if (err.code === 404) setErrors('User tidak ditemukan');
      });
  }, [username, userDetails]);

  return (
    <main className={styles.root}>
      <article className={styles.content}>
        <header>
          <img
            alt="profpic"
            className={styles.profpic}
            src={userDetails.avatar ? userDetails.avatar : DEFAULT_PROFPIC}
          />
          <h3>{user.username}</h3>
          <h4>{user.name}</h4>
        </header>
        <section>
          {!errors ? (
            links.map((link) => (
              <LinkCard name={link.linkName} link={link.linkUrl} />
            ))
          ) : (
            <h1>{errors}</h1>
          )}
        </section>
        <footer>
          <h6>Yuk bikin juga! Klik di sini.</h6>
          <p>&copy; PohonUrl | 2020</p>
        </footer>
      </article>
    </main>
  );
}
