'use client';

import { useActionState } from 'react';
import { createProduct } from '@/lib/actions';
import styles from '../admin.module.css';

export default function CreateProductPage() {
    const [state, dispatch] = useActionState(createProduct, undefined);

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Nuevo Producto</h1>

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
        </div>
    );
}
