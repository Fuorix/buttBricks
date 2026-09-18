'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getUploadSignatureAction, type UploadKind } from '@/app/actions/admin/uploads';
import { discardUploadAction } from '@/app/actions/admin/uploads';
import { cld } from '@/lib/cloudinaryUrl';
import type { ProductImage } from '@/lib/types';
import styles from './ImageUploader.module.css';

interface ImageUploaderProps {
  mode: 'single' | 'multiple';
  value: ProductImage[];
  onChange: (images: ProductImage[]) => void;
  folderKind: UploadKind;
  label?: string;
}

const MAX_BYTES = 10 * 1024 * 1024;

interface PendingUpload {
  id: string;
  name: string;
  status: 'uploading' | 'error';
  error?: string;
}

interface CloudinaryUploadResponse {
  secure_url?: string;
  public_id?: string;
  width?: number;
  height?: number;
  error?: { message?: string };
}

async function uploadToCloudinary(file: File, kind: UploadKind): Promise<ProductImage> {
  const sig = await getUploadSignatureAction(kind);
  const body = new FormData();
  body.append('file', file);
  body.append('api_key', sig.apiKey);
  body.append('timestamp', String(sig.timestamp));
  body.append('signature', sig.signature);
  body.append('folder', sig.folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, {
    method: 'POST',
    body,
  });
  const json = (await res.json()) as CloudinaryUploadResponse;
  if (!res.ok || !json.secure_url || !json.public_id) {
    throw new Error(json.error?.message ?? 'Upload failed');
  }
  const image: ProductImage = { url: json.secure_url, publicId: json.public_id };
  if (typeof json.width === 'number') image.width = json.width;
  if (typeof json.height === 'number') image.height = json.height;
  return image;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ mode, value, onChange, folderKind, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // Public IDs uploaded in this session that have not been saved yet.
  const unsavedRef = useRef<Set<string>>(new Set());
  // Latest value, so async uploads append to the current list rather than a stale one.
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);
  const idCounter = useRef(0);

  const [pending, setPending] = useState<PendingUpload[]>([]);
  const [dragging, setDragging] = useState(false);

  const canAddMore = mode === 'multiple' || value.length === 0;

  const handleFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter(Boolean);
    if (list.length === 0) return;
    const selected = mode === 'single' ? list.slice(0, 1) : list;

    for (const file of selected) {
      idCounter.current += 1;
      const id = `${idCounter.current}-${file.name}`;
      if (!file.type.startsWith('image/')) {
        setPending((p) => [...p, { id, name: file.name, status: 'error', error: 'Not an image file.' }]);
        continue;
      }
      if (file.size > MAX_BYTES) {
        setPending((p) => [...p, { id, name: file.name, status: 'error', error: 'Larger than 10 MB.' }]);
        continue;
      }

      setPending((p) => [...p, { id, name: file.name, status: 'uploading' }]);
      try {
        const image = await uploadToCloudinary(file, folderKind);
        unsavedRef.current.add(image.publicId);
        const next = mode === 'single' ? [image] : [...valueRef.current, image];
        valueRef.current = next;
        onChange(next);
        setPending((p) => p.filter((u) => u.id !== id));
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Upload failed';
        setPending((p) => p.map((u) => (u.id === id ? { ...u, status: 'error', error: message } : u)));
      }
    }
  };

  const remove = async (image: ProductImage) => {
    const next = valueRef.current.filter((i) => i.publicId !== image.publicId);
    valueRef.current = next;
    onChange(next);
    if (unsavedRef.current.has(image.publicId)) {
      unsavedRef.current.delete(image.publicId);
      try {
        await discardUploadAction(image.publicId);
      } catch {
        // Orphaned asset is harmless; ignore.
      }
    }
  };

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className={styles.uploader}>
      {value.length > 0 && (
        <div className={`${styles.grid} ${mode === 'single' ? styles.gridSingle : ''}`}>
          {value.map((image, index) => (
            <figure key={image.publicId} className={styles.item}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cld(image.url, { width: 240 })} alt="" className={styles.thumb} />
              <figcaption className={styles.itemBar}>
                {mode === 'multiple' && (
                  <>
                    <button
                      type="button"
                      className={styles.itemBtn}
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      aria-label="Move left"
                    >
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button
                      type="button"
                      className={styles.itemBtn}
                      onClick={() => move(index, 1)}
                      disabled={index === value.length - 1}
                      aria-label="Move right"
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className={`${styles.itemBtn} ${styles.itemRemove}`}
                  onClick={() => remove(image)}
                  aria-label="Remove image"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </figcaption>
              {index === 0 && mode === 'multiple' && (
                <span className={`${styles.firstTag} font-label-caps`}>First</span>
              )}
            </figure>
          ))}
        </div>
      )}

      {pending.length > 0 && (
        <ul className={styles.pendingList}>
          {pending.map((u) => (
            <li key={u.id} className={`${styles.pendingItem} ${u.status === 'error' ? styles.pendingError : ''}`}>
              <span className={`material-symbols-outlined ${u.status === 'uploading' ? styles.spin : ''}`}>
                {u.status === 'uploading' ? 'progress_activity' : 'error'}
              </span>
              <span className={styles.pendingName}>{u.name}</span>
              <span className={styles.pendingStatus}>
                {u.status === 'uploading' ? 'Uploading…' : u.error}
              </span>
              {u.status === 'error' && (
                <button
                  type="button"
                  className={styles.pendingDismiss}
                  onClick={() => setPending((p) => p.filter((x) => x.id !== u.id))}
                  aria-label="Dismiss"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {canAddMore && (
        <div
          className={`${styles.dropzone} ${dragging ? styles.dropzoneActive : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            void handleFiles(e.dataTransfer.files);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
        >
          <span className={`material-symbols-outlined ${styles.dropIcon}`}>cloud_upload</span>
          <span className={styles.dropText}>
            {label ?? (mode === 'single' ? 'Upload cover image' : 'Upload images')}
          </span>
          <span className={styles.dropHint}>Drag &amp; drop or click · JPG, PNG, WebP · max 10 MB</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple={mode === 'multiple'}
            className={styles.input}
            onChange={(e) => {
              if (e.target.files) void handleFiles(e.target.files);
              e.target.value = '';
            }}
          />
        </div>
      )}
    </div>
  );
};
