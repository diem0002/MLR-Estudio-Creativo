'use client';

import { useActionState, useState } from 'react';
import { recoverPassword } from '@/lib/actions';
import { sql } from '@vercel/postgres';
import styles from '../login/login.module.css';
import Link from 'next/link';

export default function RecoverPasswordPage() {
    const [state, formAction] = useActionState(recoverPassword, undefined);
    const [securityQuestion, setSecurityQuestion] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch security question on component mount
    useState(() => {
        async function fetchQuestion() {
            try {
                setLoading(true);
                const response = await fetch('/api/get-security-question');
                const data = await response.json();
                setSecurityQuestion(data.question);
            } catch (error) {
                console.error('Error fetching security question:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchQuestion();
    });

    return (
        <main className={styles.page}>
            <form action={formAction} className={styles.formContainer}>
                <div>
                    <h1 className={styles.title}>Recuperar Contraseña</h1>
                    <p style={{ color: 'var(--foreground)', opacity: 0.7, marginBottom: '1rem' }}>
                        Responde tu pregunta de seguridad para resetear tu contraseña
                    </p>
                </div>

                {loading ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>Cargando...</p>
                ) : securityQuestion ? (
                    <>
                        <div style={{
                            background: 'var(--rose-light)',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            marginBottom: '1rem'
                        }}>
                            <strong style={{ color: 'var(--rose-dark)' }}>Pregunta de Seguridad:</strong>
                            <p style={{ marginTop: '0.5rem', color: 'var(--text-main)' }}>{securityQuestion}</p>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="securityAnswer">Tu Respuesta</label>
                            <input
                                className={styles.input}
                                id="securityAnswer"
                                type="text"
                                name="securityAnswer"
                                placeholder="Escribe tu respuesta"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="newPassword">Nueva Contraseña</label>
                            <input
                                className={styles.input}
                                id="newPassword"
                                type="password"
                                name="newPassword"
                                placeholder="Mínimo 6 caracteres"
                                required
                                minLength={6}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="confirmPassword">Confirmar Contraseña</label>
                            <input
                                className={styles.input}
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                placeholder="Repite la contraseña"
                                required
                                minLength={6}
                            />
                        </div>

                        {state?.message && (
                            <div style={{
                                padding: '0.75rem',
                                borderRadius: '0.375rem',
                                background: state.message.includes('éxito') ? '#e8f5e9' : '#ffebee',
                                color: state.message.includes('éxito') ? '#2e7d32' : '#d32f2f',
                                fontSize: '0.9rem'
                            }}>
                                {state.message}
                            </div>
                        )}

                        <button className={styles.button} type="submit">
                            Recuperar Contraseña
                        </button>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p style={{ color: '#d32f2f', marginBottom: '1rem' }}>
                            No hay pregunta de seguridad configurada.
                        </p>
                        <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                            Debes configurar una pregunta de seguridad desde el panel de administración.
                        </p>
                    </div>
                )}

                <Link href="/login" style={{
                    display: 'block',
                    textAlign: 'center',
                    marginTop: '1rem',
                    color: 'var(--rose-primary)',
                    textDecoration: 'none'
                }}>
                    ← Volver al login
                </Link>
            </form>
        </main>
    );
}
