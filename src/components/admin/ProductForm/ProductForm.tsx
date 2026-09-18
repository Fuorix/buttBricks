'use client';

import React, { useActionState, useState } from 'react';
import Link from 'next/link';
import { saveProductAction } from '@/app/actions/admin/products';
import { slugify } from '@/lib/validation';
import type { ActionState, Category, Product, ProductFeature, ProductImage, SpecItem } from '@/lib/types';
import { ImageUploader } from '@/components/admin/ImageUploader/ImageUploader';
import { Field } from '@/components/admin/ui/Field';
import { Notice } from '@/components/admin/ui/Notice';
import ui from '@/components/admin/ui/admin.module.css';
import styles from './ProductForm.module.css';

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  allProducts: Product[];
}

const MAX_FEATURES = 6;
const MAX_NARRATIVE = 10;
const MAX_SPECS = 20;
const MAX_RELATED = 6;

const initialState: ActionState = { ok: true };

function moveItem<T>(list: T[], index: number, dir: -1 | 1): T[] {
  const target = index + dir;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

interface RowControlsProps {
  index: number;
  count: number;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
}

const RowControls: React.FC<RowControlsProps> = ({ index, count, onMove, onRemove }) => (
  <div className={styles.rowControls}>
    <button type="button" className={ui.btnIcon} onClick={() => onMove(-1)} disabled={index === 0} aria-label="Move up">
      <span className={`material-symbols-outlined ${ui.icon}`}>arrow_upward</span>
    </button>
    <button
      type="button"
      className={ui.btnIcon}
      onClick={() => onMove(1)}
      disabled={index === count - 1}
      aria-label="Move down"
    >
      <span className={`material-symbols-outlined ${ui.icon}`}>arrow_downward</span>
    </button>
    <button type="button" className={`${ui.btnIcon} ${styles.removeBtn}`} onClick={onRemove} aria-label="Remove">
      <span className={`material-symbols-outlined ${ui.icon}`}>delete</span>
    </button>
  </div>
);

export const ProductForm: React.FC<ProductFormProps> = ({ product, categories, allProducts }) => {
  const [state, formAction, pending] = useActionState(saveProductAction, initialState);
  const errors = state.fieldErrors ?? {};

  // Basics
  const [title, setTitle] = useState(product?.title ?? '');
  const [slug, setSlug] = useState(product?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(product));

  // Media
  const [coverImage, setCoverImage] = useState<ProductImage | null>(product?.coverImage ?? null);
  const [images, setImages] = useState<ProductImage[]>(product?.images ?? []);

  // Repeatables
  const [features, setFeatures] = useState<ProductFeature[]>(product?.features ?? []);
  const [narrative, setNarrative] = useState<string[]>(product?.narrative ?? []);
  const [specs, setSpecs] = useState<SpecItem[]>(product?.specs ?? []);
  const [relatedIds, setRelatedIds] = useState<string[]>(product?.relatedIds ?? []);

  const otherProducts = allProducts.filter((p) => p.id !== product?.id);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const updateFeature = (index: number, patch: Partial<ProductFeature>) =>
    setFeatures((list) => list.map((f, i) => (i === index ? { ...f, ...patch } : f)));

  const updateSpec = (index: number, patch: Partial<SpecItem>) =>
    setSpecs((list) => list.map((s, i) => (i === index ? { ...s, ...patch } : s)));

  const toggleRelated = (id: string) =>
    setRelatedIds((list) => {
      if (list.includes(id)) return list.filter((r) => r !== id);
      if (list.length >= MAX_RELATED) return list;
      return [...list, id];
    });

  return (
    <form action={formAction} className={styles.form}>
      <input type="hidden" name="id" value={product?.id ?? ''} />
      <input type="hidden" name="coverImage" value={JSON.stringify(coverImage)} />
      <input type="hidden" name="images" value={JSON.stringify(images)} />
      <input type="hidden" name="features" value={JSON.stringify(features)} />
      <input type="hidden" name="narrative" value={JSON.stringify(narrative)} />
      <input type="hidden" name="specs" value={JSON.stringify(specs)} />
      <input type="hidden" name="relatedIds" value={JSON.stringify(relatedIds)} />

      {!state.ok && state.message && <Notice kind="error">{state.message}</Notice>}

      {/* ─── Basics ─────────────────────────────────────────────── */}
      <section className={`${ui.card} ${styles.section}`}>
        <header className={styles.sectionHeader}>
          <span className={`${ui.sectionLabel} font-label-caps`}>01</span>
          <h2 className={ui.sectionTitle}>Basics</h2>
          <p className={ui.sectionHint}>Name, identity and where the product sits in the catalogue.</p>
        </header>

        <div className={styles.grid2}>
          <Field label="Title" htmlFor="p-title" required error={errors.title}>
            <input
              id="p-title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Fare Face Gutka"
              required
            />
          </Field>
          <Field
            label="Slug"
            htmlFor="p-slug"
            required
            error={errors.slug}
            hint={slug ? `Public URL: /products/${slug}` : 'Lowercase letters, numbers and hyphens.'}
          >
            <input
              id="p-slug"
              name="slug"
              type="text"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              onBlur={() => setSlug((s) => slugify(s))}
              placeholder="fare-face-gutka"
              required
            />
          </Field>
        </div>

        <div className={styles.grid3}>
          <Field label="Category" htmlFor="p-category" required error={errors.categoryId}>
            <select id="p-category" name="categoryId" defaultValue={product?.categoryId ?? ''} required>
              <option value="" disabled>
                Select a category…
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="SKU" htmlFor="p-sku" error={errors.sku}>
            <input id="p-sku" name="sku" type="text" defaultValue={product?.sku ?? ''} placeholder="BB-FFG-001" />
          </Field>
          <Field label="Sort order" htmlFor="p-order" error={errors.order} hint="Lower numbers appear first.">
            <input id="p-order" name="order" type="number" min={0} step={1} defaultValue={product?.order ?? 0} />
          </Field>
        </div>

        <Field label="Tagline" htmlFor="p-tagline" error={errors.tagline} hint="One short line shown under the title.">
          <input
            id="p-tagline"
            name="tagline"
            type="text"
            defaultValue={product?.tagline ?? ''}
            placeholder="The architect's choice for precision masonry."
          />
        </Field>

        <Field label="Description" htmlFor="p-description" required error={errors.description}>
          <textarea
            id="p-description"
            name="description"
            rows={4}
            defaultValue={product?.description ?? ''}
            placeholder="A short paragraph used on cards and at the top of the product page."
            required
          />
        </Field>

        <div className={styles.grid2}>
          <Field label="Badge" htmlFor="p-badge" error={errors.badge} hint="Optional ribbon on the card, e.g. PREMIUM.">
            <input id="p-badge" name="badge" type="text" defaultValue={product?.badge ?? ''} placeholder="PREMIUM" />
          </Field>
          <div className={styles.checkboxField}>
            <label className={styles.checkbox}>
              <input type="checkbox" name="isFeatured" defaultChecked={product?.isFeatured ?? true} />
              <span>
                <strong>Featured</strong>
                <span className={ui.muted}>Show on the home page and the main catalogue grid.</span>
              </span>
            </label>
          </div>
        </div>
      </section>

      {/* ─── Media ──────────────────────────────────────────────── */}
      <section className={`${ui.card} ${styles.section}`}>
        <header className={styles.sectionHeader}>
          <span className={`${ui.sectionLabel} font-label-caps`}>02</span>
          <h2 className={ui.sectionTitle}>Media</h2>
          <p className={ui.sectionHint}>Images are uploaded to Cloudinary as soon as you pick them.</p>
        </header>

        <div className={styles.mediaBlock}>
          <span className={styles.mediaLabel}>Cover image</span>
          <p className={`${ui.muted} ${styles.mediaHint}`}>Used on product cards. Landscape 4:3 works best.</p>
          {errors.coverImage && <p className={styles.fieldError}>{errors.coverImage}</p>}
          <ImageUploader
            mode="single"
            folderKind="products"
            value={coverImage ? [coverImage] : []}
            onChange={(list) => setCoverImage(list[0] ?? null)}
          />
        </div>

        <div className={styles.mediaBlock}>
          <span className={styles.mediaLabel}>Gallery</span>
          <p className={`${ui.muted} ${styles.mediaHint}`}>
            Shown on the product page. The first image is the main view.
          </p>
          {errors.images && <p className={styles.fieldError}>{errors.images}</p>}
          <ImageUploader mode="multiple" folderKind="products" value={images} onChange={setImages} />
        </div>
      </section>

      {/* ─── Features ───────────────────────────────────────────── */}
      <section className={`${ui.card} ${styles.section}`}>
        <header className={styles.sectionHeader}>
          <span className={`${ui.sectionLabel} font-label-caps`}>03</span>
          <h2 className={ui.sectionTitle}>Key features</h2>
          <p className={ui.sectionHint}>
            Up to {MAX_FEATURES}. Icon names come from{' '}
            <a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer">
              Material Symbols
            </a>{' '}
            (e.g. <code>shield</code>, <code>eco</code>).
          </p>
        </header>
        {errors.features && <p className={styles.fieldError}>{errors.features}</p>}

        {features.length === 0 && <p className={ui.muted}>No features yet.</p>}

        <div className={styles.rows}>
          {features.map((f, index) => (
            <div key={index} className={styles.row}>
              <div className={styles.iconPreview} aria-hidden="true">
                <span className="material-symbols-outlined">{f.icon || 'help'}</span>
              </div>
              <div className={styles.rowFields}>
                <Field label="Icon" error={errors[`features.${index}.icon`]}>
                  <input
                    type="text"
                    value={f.icon}
                    onChange={(e) => updateFeature(index, { icon: e.target.value.trim() })}
                    placeholder="shield"
                  />
                </Field>
                <Field label="Label" error={errors[`features.${index}.label`]}>
                  <input
                    type="text"
                    value={f.label}
                    onChange={(e) => updateFeature(index, { label: e.target.value })}
                    placeholder="Weather Resistant"
                  />
                </Field>
                <Field label="Text" error={errors[`features.${index}.text`]} className={styles.spanTwo}>
                  <input
                    type="text"
                    value={f.text}
                    onChange={(e) => updateFeature(index, { text: e.target.value })}
                    placeholder="Withstands extreme thermal shifts."
                  />
                </Field>
              </div>
              <RowControls
                index={index}
                count={features.length}
                onMove={(dir) => setFeatures((l) => moveItem(l, index, dir))}
                onRemove={() => setFeatures((l) => l.filter((_, i) => i !== index))}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className={ui.btnSecondary}
          onClick={() => setFeatures((l) => [...l, { icon: '', label: '', text: '' }])}
          disabled={features.length >= MAX_FEATURES}
        >
          <span className="material-symbols-outlined">add</span>
          Add feature
        </button>
      </section>

      {/* ─── Narrative ──────────────────────────────────────────── */}
      <section className={`${ui.card} ${styles.section}`}>
        <header className={styles.sectionHeader}>
          <span className={`${ui.sectionLabel} font-label-caps`}>04</span>
          <h2 className={ui.sectionTitle}>Structural narrative</h2>
          <p className={ui.sectionHint}>Paragraphs for the product story. The first one is set larger.</p>
        </header>
        {errors.narrative && <p className={styles.fieldError}>{errors.narrative}</p>}

        {narrative.length === 0 && <p className={ui.muted}>No paragraphs yet.</p>}

        <div className={styles.rows}>
          {narrative.map((text, index) => (
            <div key={index} className={styles.row}>
              <div className={styles.rowIndex}>{index + 1}</div>
              <div className={styles.rowFields}>
                <Field label={`Paragraph ${index + 1}`} error={errors[`narrative.${index}`]} className={styles.spanFull}>
                  <textarea
                    rows={3}
                    value={text}
                    onChange={(e) =>
                      setNarrative((l) => l.map((t, i) => (i === index ? e.target.value : t)))
                    }
                  />
                </Field>
              </div>
              <RowControls
                index={index}
                count={narrative.length}
                onMove={(dir) => setNarrative((l) => moveItem(l, index, dir))}
                onRemove={() => setNarrative((l) => l.filter((_, i) => i !== index))}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className={ui.btnSecondary}
          onClick={() => setNarrative((l) => [...l, ''])}
          disabled={narrative.length >= MAX_NARRATIVE}
        >
          <span className="material-symbols-outlined">add</span>
          Add paragraph
        </button>
      </section>

      {/* ─── Specs ──────────────────────────────────────────────── */}
      <section className={`${ui.card} ${styles.section}`}>
        <header className={styles.sectionHeader}>
          <span className={`${ui.sectionLabel} font-label-caps`}>05</span>
          <h2 className={ui.sectionTitle}>Engineering datasheet</h2>
          <p className={ui.sectionHint}>Rows of the technical specification table.</p>
        </header>
        {errors.specs && <p className={styles.fieldError}>{errors.specs}</p>}

        {specs.length === 0 && <p className={ui.muted}>No specifications yet.</p>}

        <div className={styles.rows}>
          {specs.map((s, index) => (
            <div key={index} className={styles.row}>
              <div className={styles.rowIndex}>{index + 1}</div>
              <div className={styles.rowFields}>
                <Field label="Specification" error={errors[`specs.${index}.spec`]}>
                  <input
                    type="text"
                    value={s.spec}
                    onChange={(e) => updateSpec(index, { spec: e.target.value })}
                    placeholder="Dimensions"
                  />
                </Field>
                <Field label="Detail" error={errors[`specs.${index}.detail`]}>
                  <input
                    type="text"
                    value={s.detail}
                    onChange={(e) => updateSpec(index, { detail: e.target.value })}
                    placeholder='9" x 1.5" x 3"'
                  />
                </Field>
                <Field label="Unit / method" error={errors[`specs.${index}.unit`]}>
                  <input
                    type="text"
                    value={s.unit}
                    onChange={(e) => updateSpec(index, { unit: e.target.value })}
                    placeholder="Nominal Size"
                  />
                </Field>
              </div>
              <RowControls
                index={index}
                count={specs.length}
                onMove={(dir) => setSpecs((l) => moveItem(l, index, dir))}
                onRemove={() => setSpecs((l) => l.filter((_, i) => i !== index))}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className={ui.btnSecondary}
          onClick={() => setSpecs((l) => [...l, { spec: '', detail: '', unit: '' }])}
          disabled={specs.length >= MAX_SPECS}
        >
          <span className="material-symbols-outlined">add</span>
          Add specification
        </button>
      </section>

      {/* ─── Related ────────────────────────────────────────────── */}
      <section className={`${ui.card} ${styles.section}`}>
        <header className={styles.sectionHeader}>
          <span className={`${ui.sectionLabel} font-label-caps`}>06</span>
          <h2 className={ui.sectionTitle}>Similar materials</h2>
          <p className={ui.sectionHint}>
            Pick up to {MAX_RELATED} products to show in the “Similar Materials” strip. {relatedIds.length}/
            {MAX_RELATED} selected.
          </p>
        </header>
        {errors.relatedIds && <p className={styles.fieldError}>{errors.relatedIds}</p>}

        {otherProducts.length === 0 ? (
          <p className={ui.muted}>No other products to relate yet.</p>
        ) : (
          <div className={styles.relatedGrid}>
            {otherProducts.map((p) => {
              const checked = relatedIds.includes(p.id);
              const disabled = !checked && relatedIds.length >= MAX_RELATED;
              return (
                <label
                  key={p.id}
                  className={`${styles.relatedItem} ${checked ? styles.relatedChecked : ''} ${
                    disabled ? styles.relatedDisabled : ''
                  }`}
                >
                  <input type="checkbox" checked={checked} disabled={disabled} onChange={() => toggleRelated(p.id)} />
                  <span className={styles.relatedText}>
                    <span className={styles.relatedTitle}>{p.title}</span>
                    <span className={ui.muted}>{p.categoryName || 'Uncategorised'}</span>
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </section>

      <div className={styles.footer}>
        <Link href="/admin/products" className={ui.btnGhost}>
          Cancel
        </Link>
        <button type="submit" className={ui.btnPrimary} disabled={pending}>
          <span className="material-symbols-outlined">save</span>
          {pending ? 'Saving…' : 'Save product'}
        </button>
      </div>
    </form>
  );
};
