'use client';

import { useActionState } from 'react';
import { createCategory } from '@/lib/actions';
import styles from '../admin.module.css';

export function CreateCategoryForm() {
    const [state, formAction] = useActionState(createCategory, undefined);

    return (
        <form action={formAction} className={styles.form} style={{ maxWidth: '500px' }}>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Nombre de la Categoría</label>
                <input
                    name="name"
                    className={styles.input}
                    required
                    placeholder="Ej: Agendas, Stickers, etc."
                />
            </div>
            {state?.message && <p style={{ color: '#d32f2f', fontSize: '0.9rem' }}>{state.message}</p>}
            <button type="submit" className={styles.createButton} style={{ marginTop: '0.5rem' }}>
                Crear Categoría
            </button>
        </form>
    );
}
