import React from 'react';
import styles from './Notice.module.css';

interface NoticeProps {
  kind: 'success' | 'error' | 'info';
  children: React.ReactNode;
  onDismiss?: () => void;
}

export const Notice: React.FC<NoticeProps> = ({ kind, children, onDismiss }) => {
  const icon = kind === 'success' ? 'check_circle' : kind === 'error' ? 'error' : 'info';
  return (
    <div className={`${styles.notice} ${styles[kind]}`} role={kind === 'error' ? 'alert' : 'status'}>
      <span className={`material-symbols-outlined ${styles.icon}`}>{icon}</span>
      <div className={styles.body}>{children}</div>
      {onDismiss && (
        <button type="button" className={styles.dismiss} onClick={onDismiss} aria-label="Dismiss">
          <span className="material-symbols-outlined">close</span>
        </button>
      )}
    </div>
  );
};
