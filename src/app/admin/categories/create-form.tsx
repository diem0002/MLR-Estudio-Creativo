'use client';

import { useActionState } from 'react';
import { createCategory } from '@/lib/actions';
import styles from '../admin.module.css';

export function CreateCategoryForm() {
    const [state, dispatch] = useActionState(createCategory, undefined);

    return (
        <div className={styles.card}>
            <h3>Nueva Categoría</h3>
            <form action={dispatch} className={styles.form}>
                {state?.message && (
                    <p style={{ color: 'red', fontSize: '0.9rem' }}>{state.message}</p>
                )}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Nombre</label>
                    <input name="name" type="text" className={styles.input} required placeholder="Ej. Agendas" />
                </div>
                <button type="submit" className={styles.createButton}>
                    Crear
                </button>
            </form>
        </div>
    );
}
