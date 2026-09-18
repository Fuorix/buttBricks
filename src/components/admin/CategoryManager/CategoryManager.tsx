'use client';

import React, { useActionState, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCategoryAction, saveCategoryAction } from '@/app/actions/admin/categories';
import { slugify } from '@/lib/validation';
import type { ActionState, Category } from '@/lib/types';
import { Field } from '@/components/admin/ui/Field';
import { Notice } from '@/components/admin/ui/Notice';
import ui from '@/components/admin/ui/admin.module.css';
import styles from './CategoryManager.module.css';

interface CategoryManagerProps {
  categories: Category[];
  productCounts: Record<string, number>;
}

const initialState: ActionState = { ok: true };

/* ─── Shared form used for both create and edit ────────────────────────── */

interface CategoryFormProps {
  category?: Category;
  onDone?: () => void;
  onCancel?: () => void;
  compact?: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onDone, onCancel, compact }) => {
  const router = useRouter();
  const [name, setName] = useState(category?.name ?? '');
  const [slug, setSlug] = useState(category?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(category));
  const formRef = useRef<HTMLFormElement>(null);

  // Wrap the server action so a successful save refreshes the list and resets/closes the form.
  const [state, formAction, pending] = useActionState(
    async (prev: ActionState, formData: FormData): Promise<ActionState> => {
      const result = await saveCategoryAction(prev, formData);
      if (result.ok) {
        router.refresh();
        if (!category) {
          formRef.current?.reset();
          setName('');
          setSlug('');
          setSlugTouched(false);
        }
        onDone?.();
      }
      return result;
    },
    initialState
  );
  const errors = state.fieldErrors ?? {};

  const prefix = category ? `cat-${category.id}` : 'cat-new';

  return (
    <form ref={formRef} action={formAction} className={`${styles.form} ${compact ? styles.formCompact : ''}`}>
      <input type="hidden" name="id" value={category?.id ?? ''} />

      {state.message && (
        <div className={styles.formNotice}>
          <Notice kind={state.ok ? 'success' : 'error'}>{state.message}</Notice>
        </div>
      )}

      <Field label="Name" htmlFor={`${prefix}-name`} required error={errors.name}>
        <input
          id={`${prefix}-name`}
          name="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          placeholder="Architectural Tiles"
          required
        />
      </Field>

      <Field label="Slug" htmlFor={`${prefix}-slug`} required error={errors.slug}>
        <input
          id={`${prefix}-slug`}
          name="slug"
          type="text"
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          onBlur={() => setSlug((s) => slugify(s))}
          placeholder="architectural-tiles"
          required
        />
      </Field>

      <Field label="Order" htmlFor={`${prefix}-order`} error={errors.order}>
        <input
          id={`${prefix}-order`}
          name="order"
          type="number"
          min={0}
          step={1}
          defaultValue={category?.order ?? 0}
        />
      </Field>

      <Field label="Description" htmlFor={`${prefix}-description`} error={errors.description} className={styles.spanFull}>
        <textarea
          id={`${prefix}-description`}
          name="description"
          rows={2}
          defaultValue={category?.description ?? ''}
          placeholder="Optional short description."
        />
      </Field>

      <div className={`${styles.formActions} ${styles.spanFull}`}>
        {onCancel && (
          <button type="button" className={ui.btnGhost} onClick={onCancel} disabled={pending}>
            Cancel
          </button>
        )}
        <button type="submit" className={ui.btnPrimary} disabled={pending}>
          <span className="material-symbols-outlined">{category ? 'save' : 'add'}</span>
          {pending ? 'Saving…' : category ? 'Save changes' : 'Add category'}
        </button>
      </div>
    </form>
  );
};

/* ─── Row with inline edit + delete ────────────────────────────────────── */

interface CategoryRowProps {
  category: Category;
  count: number;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ category, count }) => {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    if (!window.confirm(`Delete category "${category.name}"?`)) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteCategoryAction(category.id);
      if (result.ok) {
        router.refresh();
      } else {
        setError(result.message ?? 'Could not delete the category.');
      }
    });
  };

  if (editing) {
    return (
      <li className={`${styles.row} ${styles.rowEditing}`}>
        <CategoryForm category={category} compact onDone={() => setEditing(false)} onCancel={() => setEditing(false)} />
      </li>
    );
  }

  return (
    <li className={styles.row}>
      <div className={styles.rowMain}>
        <span className={styles.rowName}>{category.name}</span>
        <span className={ui.muted}>
          /{category.slug}
          {category.description ? ` · ${category.description}` : ''}
        </span>
        {error && (
          <span className={styles.rowError} role="alert">
            {error}
          </span>
        )}
      </div>
      <span className={ui.muted}>Order {category.order}</span>
      <span className={count > 0 ? ui.pillOn : ui.pillOff}>
        {count} product{count === 1 ? '' : 's'}
      </span>
      <div className={styles.rowActions}>
        <button type="button" className={`${ui.btnSecondary} ${ui.btnSmall}`} onClick={() => setEditing(true)}>
          <span className="material-symbols-outlined">edit</span>
          Edit
        </button>
        <button
          type="button"
          className={`${ui.btnDanger} ${ui.btnSmall}`}
          onClick={handleDelete}
          disabled={pending}
          title={count > 0 ? 'Move or delete its products first' : undefined}
        >
          <span className="material-symbols-outlined">delete</span>
          {pending ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </li>
  );
};

/* ─── Manager ──────────────────────────────────────────────────────────── */

export const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, productCounts }) => {
  return (
    <div className={styles.manager}>
      <section className={ui.card}>
        <span className={`${ui.sectionLabel} font-label-caps`}>Create</span>
        <h2 className={ui.sectionTitle}>New category</h2>
        <p className={ui.sectionHint}>The slug is generated from the name; adjust it if needed.</p>
        <div className={styles.createForm}>
          <CategoryForm />
        </div>
      </section>

      <section className={ui.card}>
        <span className={`${ui.sectionLabel} font-label-caps`}>Manage</span>
        <h2 className={ui.sectionTitle}>
          All categories <span className={styles.countBadge}>{categories.length}</span>
        </h2>

        {categories.length === 0 ? (
          <div className={ui.emptyState}>
            <h3>No categories yet</h3>
            <p>Use the form above to add the first one.</p>
          </div>
        ) : (
          <ul className={styles.list}>
            {categories.map((c) => (
              <CategoryRow key={c.id} category={c} count={productCounts[c.id] ?? 0} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
