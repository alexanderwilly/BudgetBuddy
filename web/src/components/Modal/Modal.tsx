import React from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

export type ModalAction = {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: React.ReactNode;
  actions: ModalAction[];
};

export default function Modal({ isOpen, onClose, message, actions }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
        <div className={styles.modalText}>{message}</div>
        <div className={styles.modalActions}>
          {actions.map((action, index) => {
            const btnClass = 
              action.variant === 'danger' ? styles.btnDanger :
              action.variant === 'primary' ? styles.btnPrimary :
              styles.btnSecondary;

            return (
              <button 
                key={index} 
                className={`${styles.modalBtn} ${btnClass}`} 
                onClick={action.onClick}
              >
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
