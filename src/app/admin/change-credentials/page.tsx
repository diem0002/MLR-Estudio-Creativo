'use client';

import { useActionState } from 'react';
import { updateCredentials } from '@/lib/actions';
import styles from '../admin.module.css';

export default function ChangeCredentialsPage() {
    const [state, formAction] = useActionState(updateCredentials, undefined);

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Cambiar Credenciales</h1>

            <form action={formAction} className={styles.form} style={{ maxWidth: '500px' }}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Contraseña Actual</label>
                    <input
                        name="currentPassword"
                        type="password"
                        className={styles.input}
                        required
                        autoComplete="current-password"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Nuevo Email</label>
                    <input
                        name="newEmail"
                        type="email"
                        className={styles.input}
                        required
                        placeholder="tu@email.com"
                        autoComplete="email"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Nueva Contraseña</label>
                    <input
                        name="newPassword"
                        type="password"
                        className={styles.input}
                        required
                        minLength={6}
                        autoComplete="new-password"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Confirmar Nueva Contraseña</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        className={styles.input}
                        required
                        minLength={6}
                        autoComplete="new-password"
                    />
                </div>

                <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--rose-dark)' }}>
                    Pregunta de Seguridad (Recuperación de Contraseña)
                </h3>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Pregunta de Seguridad</label>
                    <input
                        name="securityQuestion"
                        type="text"
                        className={styles.input}
                        placeholder="Ej: ¿Nombre de tu primera mascota?"
                    />
                    <small style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
                        Opcional. Te permitirá recuperar tu contraseña si la olvidas.
                    </small>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Respuesta</label>
                    <input
                        name="securityAnswer"
                        type="text"
                        className={styles.input}
                        placeholder="Tu respuesta secreta"
                    />
                </div>

                {state?.message && (
                    <p style={{
                        color: state.message.includes('éxito') ? '#2e7d32' : '#d32f2f',
                        background: state.message.includes('éxito') ? '#e8f5e9' : '#ffebee',
                        padding: '0.75rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.9rem'
                    }}>
                        {state.message}
                    </p>
                )}

                <button type="submit" className={styles.createButton}>
                    Actualizar Credenciales
                </button>
            </form>
        </div>
    );
}
