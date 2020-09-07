import React from 'react';
import styles from './styles.module.css';

import TextField from '../../fields/TextField';
import Button from '../../elements/Button';

export default function AddLink(props) {
  const {
    addLink,
    handleChange,
    handleSubmitLink,
    handleSubmitEdit,
    isLinkEdit,
    linkList,
    setLinkEdit,
    setAddLink,
  } = props;

  return (
    <div className={styles['add-new']}>
      <h4>
        Tambah Link Baru{' '}
        {!linkList.length && (
          <span className={styles['start-here']}>Yuk mulai dari sini!</span>
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
  );
}
