import React from 'react';
import styles from './styles.module.css';

import Modal from '../../elements/Modal';
import LinkPage from '../../../pages/LinkPage';

export default function ModalPreview({ onClose, open }) {
  return (
    <Modal onClose={onClose} open={open}>
      <section className={styles['modal-preview-root']}>
        <LinkPage userProps={'ilhammarzlik'} />
      </section>
    </Modal>
  );
}
