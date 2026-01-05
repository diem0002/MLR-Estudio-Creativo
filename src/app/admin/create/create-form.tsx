'use client';

import { useActionState } from 'react';
import { createProduct } from '@/lib/actions';
import styles from '../admin.module.css';
import { Category } from '@/lib/definitions';

export default function CreateProductForm({ categories }: { categories: Category[] }) {
    const [state, dispatch] = useActionState(createProduct, undefined);

    return (
        <form action={dispatch} className={styles.form}>
            {state?.message && (
                <p style={{ color: 'red', padding: '0.5rem', background: '#ffebee', borderRadius: '4px' }}>
                    {state.message}
                </p>
            )}
            <div className={styles.inputGroup}>
                <label className={styles.label}>Nombre</label>
                <input name="name" type="text" className={styles.input} required />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Categoría</label>
                <select name="category_id" className={styles.input} required defaultValue="">
                    <option value="" disabled>Selecciona una categoría</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Precio ($)</label>
                <input name="price" type="number" className={styles.input} required />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Descripción</label>
                <textarea name="description" className={styles.textarea} required />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Imagen</label>
                <input name="image" type="file" accept="image/*" required className={styles.fileInput} />
            </div>

            <button type="submit" className={styles.createButton}>
                Guardar Producto
            </button>
        </form>
    );
}
