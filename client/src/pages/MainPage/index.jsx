import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './styles.module.css';
import { AppContext } from '../../contexts';
import useWindowSize from '../../utils/windowSize';
import { clearStorage } from '../../utils/storage';
import {
  userDetail,
  addNewLink,
  getAllLinks,
  deleteLink,
  updateLink,
} from '../../utils/fetch';
import { IC_LOGOUT, IC_TREE } from '../../config/images';

import ModalPreview from '../../components/fragments/ModalPreview';
import ProfileSection from '../../components/fragments/ProfileSection';
import AddLink from '../../components/forms/AddLink';
import LinkDetails from '../../components/fragments/LinkDetails';
import ModalSuccess from '../../components/fragments/ModalSuccess';
import ModalConfirmation from '../../components/fragments/ModalConfirmation';

export default function MainPage() {
  const [addLink, setAddLink] = useState({
    linkName: '',
    linkUrl: '',
  });
  const [isLinkEdit, setLinkEdit] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [logoutModal, setLogoutModal] = useState(false);
  const { userDetails, linkList, setUserDetails, setLinkList } = useContext(
    AppContext
  );
  const { replace } = useHistory();
  const { width } = useWindowSize();

  useEffect(() => {
    if (width < 754) setMobile(true);
    else setMobile(false);
  }, [width]);

  useEffect(() => {
    userDetail()
      .then((res) => setUserDetails(res.data))
      .catch((err) => console.log(err));
    getAllLinks()
      .then((res) => setLinkList(res.data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const handleChange = ({ target }) => {
    const newAdd = { ...addLink };
    newAdd[target.name] = target.value;
    setAddLink(newAdd);
  };

  const handleSubmitLink = (e) => {
    e.preventDefault();
    if (addLink.linkName && addLink.linkUrl) {
      if (
        !addLink.linkUrl.startsWith('https') ||
        addLink.linkUrl.startsWith('http')
      ) {
        addLink.linkUrl = `https://${addLink.linkUrl}`;
      }
      // console.log(addLink);
      addNewLink(addLink)
        .then((res) => {
          setAddLink({
            linkName: '',
            linkUrl: '',
          });
          return getAllLinks();
        })
        .then((res) => {
          setSuccessModal(true);
          setSuccessMessage('Berhasil menambahkan data baru');
          setLinkList(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteLink = (id) => {
    deleteLink(id)
      .then(() => {
        return getAllLinks();
      })
      .then((res) => {
        setSuccessModal(true);
        setSuccessMessage('Data berhasil dihapus.');
        setLinkList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleEditLink = (data) => {
    setLinkEdit(true);
    setAddLink(data);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (addLink.linkName && addLink.linkUrl) {
      updateLink(addLink._id, addLink)
        .then(() => {
          return getAllLinks();
        })
        .then((res) => {
          setAddLink({
            linkName: '',
            linkUrl: '',
          });
          setSuccessModal(true);
          setSuccessMessage('Berhasil mengubah data.');
          setLinkList(res.data);
          setLinkEdit(false);
        })
        .catch((err) => console.log(err));
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
                JadiSatu <span>Atur link kamu, sesukamu!</span>
              </h2>
            </div>
            <div className={styles.profile}>
              <p>Hello, {userDetails.name}</p>
              <h6
                className={styles['logout-btn']}
                onClick={() => setLogoutModal(true)}
              >
                Logout
                <img alt="ic-logout" src={IC_LOGOUT} />
              </h6>
            </div>
          </header>
          <article className={styles.content}>
            {width < 754 && (
              <NavMobile
                setIsProfile={setIsProfile}
                userDetails={userDetails}
              />
            )}
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
                  <a
                    href={`/${userDetails.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://jadisatu.in/{userDetails.username}
                  </a>
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
      <ModalSuccess
        onClose={() => setSuccessModal(false)}
        open={successModal}
        action={() => setSuccessModal(false)}
        message={successMessage}
      />
      <ModalConfirmation
        message="Apakah anda yakin untuk logout?"
        action={() => {
          replace('/');
          clearStorage();
          setLogoutModal(false);
        }}
        handleClick={() => setLogoutModal(true)}
        open={logoutModal}
        onClose={() => setLogoutModal(false)}
      />
    </>
  );
}

export const NavMobile = ({ setIsProfile, userDetails }) => {
  return (
    <header className={styles['nav-mobile']}>
      <div>
        <h4>Bagikan Link Kamu</h4>
        <a href={`$/${userDetails.username}`}>
          https://jadisatu.in/{userDetails.username}
        </a>
      </div>
      <nav>
        <p onClick={() => setIsProfile(false)}>Home</p>
        <p onClick={() => setIsProfile(true)}>Profile</p>
      </nav>
    </header>
  );
};
