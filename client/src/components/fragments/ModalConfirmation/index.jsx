import React from 'react';
import styles from './styles.module.css';

import Modal from '../../elements/Modal';
import Button from '../../elements/Button';

export default function ModalConfirmation(props) {
  const { message, action, onClose, open } = props;

  return (
    <Modal onClose={onClose} open={open}>
      <section className={styles['confirmation-root']}>
        <h2>{message}</h2>
        <footer className={styles['confirmation-action']}>
          <Button handleClick={onClose} variant="bordered">
            Batal
          </Button>
          <Button handleClick={action} variant="danger">
            Ya
          </Button>
        </footer>
      </section>
    </Modal>
  );
}
