'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProductAction } from '@/app/actions/admin/products';
import ui from '@/components/admin/ui/admin.module.css';
import styles from './DeleteProductButton.module.css';

interface DeleteProductButtonProps {
  id: string;
  title: string;
}

export const DeleteProductButton: React.FC<DeleteProductButtonProps> = ({ id, title }) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${title}"?\n\nThis removes the product and its images permanently.`
    );
    if (!confirmed) return;

    startTransition(async () => {
      const result = await deleteProductAction(id);
      if (result.ok) {
        router.refresh();
      } else {
        setMessage({ ok: false, text: result.message ?? 'Could not delete the product.' });
      }
    });
  };

  return (
    <span className={styles.wrap}>
      <button
        type="button"
        className={`${ui.btnDanger} ${ui.btnSmall}`}
        onClick={handleDelete}
        disabled={pending}
        aria-label={`Delete ${title}`}
      >
        <span className="material-symbols-outlined">delete</span>
        {pending ? 'Deleting…' : 'Delete'}
      </button>
      {message && !message.ok && (
        <span className={styles.error} role="alert">
          {message.text}
        </span>
      )}
    </span>
  );
};
