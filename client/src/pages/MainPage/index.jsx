import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';

import TextField from '../../components/fields/TextField';
import Button from '../../components/elements/Button';
import { DEMO_PHOTO, IC_LOGOUT } from '../../config/images';

export default function MainPage() {
  const [linkList, setLinkList] = useState([]);
  const [addLink, setAddLink] = useState({
    id: '',
    linkName: '',
    linkUrl: '',
  });
  const [isLinkEdit, setLinkEdit] = useState(false);
  const { replace } = useHistory();

  const handleChange = ({ target }) => {
    const newAdd = { ...addLink };
    newAdd[target.name] = target.value;
    setAddLink(newAdd);
  };

  const handleSubmitLink = (e) => {
    e.preventDefault();
    if (addLink.linkName && addLink.linkUrl) {
      const added = {
        ...addLink,
        id: linkList.length ? linkList[linkList.length - 1].id + 1 : 0,
      };
      const newList = [...linkList, added];
      setAddLink({
        id: '',
        linkName: '',
        linkUrl: '',
      });
      setLinkList(newList);
    }
  };

  const handleDeleteLink = (id) => {
    const newDeleted = linkList.filter((el) => el.id !== id);
    setLinkList(newDeleted);
  };

  const handleEditLink = (data) => {
    setLinkEdit(true);
    setAddLink(data);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (addLink.linkName && addLink.linkUrl) {
      const newList = [...linkList];
      const editedIdx = linkList.findIndex((el) => el.id === addLink.id);
      newList[editedIdx] = addLink;
      setLinkList(newList);
      setAddLink({
        id: '',
        linkName: '',
        linkUrl: '',
      });
      setLinkEdit(false);
    }
  };

  return (
    <main className={styles.root}>
      <article className={styles['content-box']}>
        <header>
          <div className={styles.title}>
            <h2>PohonUrl</h2>
            <p>Atur link kamu, sesukamu!</p>
          </div>
          <div className={styles.profile}>
            <p>Hello, ilhammarzlik</p>
            <h6 className={styles['logout-btn']} onClick={() => replace('/')}>
              Logout
              <img alt="ic-logout" src={IC_LOGOUT} />
            </h6>
          </div>
        </header>
        <article className={styles.content}>
          <section className={styles['manage-link']}>
            <div className={styles['add-new']}>
              <h4>
                Tambah Link Baru{' '}
                {!linkList.length && (
                  <span className={styles['start-here']}>
                    Yuk mulai dari sini!
                  </span>
                )}
              </h4>
              <form>
                <TextField
                  inputProps={{
                    placeholder: 'cth: Instagram',
                    value: addLink.linkName,
                    required: true,
                  }}
                  name="linkName"
                  label="Nama Link"
                  handleChange={handleChange}
                />
                <TextField
                  inputProps={{
                    placeholder: 'cth: https://instagram.com/usernamekamu',
                    value: addLink.linkUrl,
                    required: true,
                  }}
                  name="linkUrl"
                  label="URL"
                  handleChange={handleChange}
                />
                {!isLinkEdit ? (
                  <Button
                    handleClick={handleSubmitLink}
                    type="submit"
                    variant="primary"
                  >
                    Tambah
                  </Button>
                ) : (
                  <div className={styles['link-action']}>
                    <Button
                      handleClick={handleSubmitEdit}
                      type="submit"
                      variant="ternary"
                    >
                      Simpan
                    </Button>
                    <Button
                      handleClick={(e) => {
                        setLinkEdit(false);
                        setAddLink({
                          id: '',
                          linkName: '',
                          linkUrl: '',
                        });
                      }}
                      variant="danger"
                    >
                      Batal
                    </Button>
                  </div>
                )}
              </form>
            </div>
            {linkList.length ? (
              <div className={styles['manage']}>
                <header>
                  <h4>
                    Atur Link Kamu
                    <span>Silakan drag & drop untuk mengatur urutan link</span>
                  </h4>
                  <p>Live Preview</p>
                </header>{' '}
                <section className={styles['link-list']}>
                  {linkList.map((el) => (
                    <LinkCard
                      data={el}
                      handleDelete={handleDeleteLink}
                      handleEdit={handleEditLink}
                    />
                  ))}
                </section>
              </div>
            ) : null}
          </section>
          <aside className={styles['manage-profile']}>
            <header className={styles['profile-header']}>
              <h4>Bagikan Link Kamu</h4>
              <a href="/">https://pohonurl.com/ilhammarzlik</a>
            </header>
            <ProfileSection />
          </aside>
        </article>
      </article>
    </main>
  );
}

export const LinkCard = ({ data, handleDelete, handleEdit }) => {
  return (
    <div className={styles['link-card']}>
      <div className={styles['link-card-name']}>
        <h6>{data.linkName}</h6>
        <h5>
          {data.linkUrl.startsWith('https') || data.linkUrl.startsWith('http')
            ? data.linkUrl
            : `https://${data.linkUrl}`}
        </h5>
      </div>
      <div className={styles['link-card-action']}>
        <p onClick={() => handleEdit(data)}>Edit</p>
        <p onClick={() => handleDelete(data.id)}>Delete</p>
      </div>
    </div>
  );
};

export const ProfileSection = () => {
  const [isEdit, setEdit] = useState(false);

  return (
    <section className={styles['profile-section']}>
      <figure>
        <img alt="prof-pic" src={DEMO_PHOTO} />
      </figure>
      <div>
        <TextField
          inputProps={{ disabled: !isEdit, value: 'Ilham Abdul Malik' }}
          name="name"
          label="Nama Lengkap"
        />
        <TextField
          inputProps={{ disabled: !isEdit, value: 'ilhammarzlik' }}
          name="username"
          label="Username"
        />
      </div>
      <div className={styles['profile-action']}>
        {isEdit ? (
          <>
            {' '}
            <Button handleClick={() => setEdit(false)} variant="danger">
              Batal
            </Button>
            <Button variant="primary">Simpan</Button>
          </>
        ) : (
          <Button handleClick={() => setEdit(true)} variant="secondary">
            Ubah Data
          </Button>
        )}
      </div>
    </section>
  );
};
