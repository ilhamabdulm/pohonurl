import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './styles.module.css';
import { IC_LOGOUT, IC_TREE } from '../../config/images';

import ModalPreview from '../../components/fragments/ModalPreview';
import { ProfileSection } from '../../components/fragments/ProfileSection';
import AddLink from '../../components/forms/AddLink';
import LinkDetails from '../../components/fragments/LinkDetails';
import useWindowSize from '../../utils/windowSize';

export default function MainPage() {
  const [linkList, setLinkList] = useState([]);
  const [addLink, setAddLink] = useState({
    id: '',
    linkName: '',
    linkUrl: '',
  });
  const [isLinkEdit, setLinkEdit] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const { replace } = useHistory();
  const { width } = useWindowSize();

  useEffect(() => {
    if (width < 754) setMobile(true);
    else setMobile(false);
  }, [width]);

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
    <>
      <main className={styles.root}>
        <article className={styles['content-box']}>
          <header>
            <div className={styles.title}>
              <img alt="ic-tree" src={IC_TREE} />
              <h2>
                PohonUrl <span>Atur link kamu, sesukamu!</span>
              </h2>
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
            {width < 754 && <NavMobile setIsProfile={setIsProfile} />}
            {!isMobile && (
              <section className={styles['manage-link']}>
                <AddLink
                  addLink={addLink}
                  handleChange={handleChange}
                  handleSubmitLink={handleSubmitLink}
                  handleSubmitEdit={handleSubmitEdit}
                  isLinkEdit={isLinkEdit}
                  linkList={linkList}
                  setLinkEdit={setLinkEdit}
                  setAddLink={setAddLink}
                />
                {linkList.length ? (
                  <div className={styles['manage']}>
                    <header>
                      <h4>
                        Atur Link Kamu
                        <span>
                          Silakan drag & drop untuk mengatur urutan link
                        </span>
                      </h4>
                      <p onClick={() => setOpenPreview(true)}>Live Preview</p>
                    </header>{' '}
                    <section className={styles['link-list']}>
                      {linkList.map((el) => (
                        <LinkDetails
                          data={el}
                          handleDelete={handleDeleteLink}
                          handleEdit={handleEditLink}
                        />
                      ))}
                    </section>
                  </div>
                ) : null}
              </section>
            )}
            {isMobile && !isProfile ? (
              <section className={styles['manage-link']}>
                <AddLink
                  addLink={addLink}
                  handleChange={handleChange}
                  handleSubmitLink={handleSubmitLink}
                  handleSubmitEdit={handleSubmitEdit}
                  isLinkEdit={isLinkEdit}
                  linkList={linkList}
                  setLinkEdit={setLinkEdit}
                  setAddLink={setAddLink}
                />
                {linkList.length ? (
                  <div className={styles['manage']}>
                    <header>
                      <h4>
                        Atur Link Kamu
                        <span>
                          Silakan drag & drop untuk mengatur urutan link
                        </span>
                      </h4>
                      <p onClick={() => setOpenPreview(true)}>Live Preview</p>
                    </header>{' '}
                    <section className={styles['link-list']}>
                      {linkList.map((el) => (
                        <LinkDetails
                          data={el}
                          handleDelete={handleDeleteLink}
                          handleEdit={handleEditLink}
                        />
                      ))}
                    </section>
                  </div>
                ) : null}
              </section>
            ) : null}
            {!isMobile && (
              <aside className={styles['manage-profile']}>
                <header className={styles['profile-header']}>
                  <h4>Bagikan Link Kamu</h4>
                  <a href="/ilham">https://pohonurl.com/ilhammarzlik</a>
                </header>
                <ProfileSection />
              </aside>
            )}
            {isMobile && isProfile ? (
              <aside className={styles['manage-profile']}>
                <ProfileSection />
              </aside>
            ) : null}
          </article>
        </article>
      </main>
      <ModalPreview onClose={() => setOpenPreview(false)} open={openPreview} />
    </>
  );
}

export const NavMobile = ({ setIsProfile }) => {
  return (
    <header className={styles['nav-mobile']}>
      <div>
        <h4>Bagikan Link Kamu</h4>
        <a href="/ilhammarzlik">https://pohonurl.com/ilhamarzlik</a>
      </div>
      <nav>
        <p onClick={() => setIsProfile(false)}>Home</p>
        <p onClick={() => setIsProfile(true)}>Profile</p>
      </nav>
    </header>
  );
};
