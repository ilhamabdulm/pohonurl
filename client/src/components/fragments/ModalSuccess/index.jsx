import React from 'react';
import styles from './styles.module.css';

import Modal from '../../elements/Modal';
import Button from '../../elements/Button';

export default function ModalSuccess(props) {
  const { onClose, open, message, action } = props;

  return (
    <Modal onClose={onClose} open={open}>
      <section className={styles['success-root']}>
        <h2>{message}</h2>
        <Button handleClick={action} variant="primary">
          Tutup
        </Button>
      </section>
    </Modal>
  );
}
