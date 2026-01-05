import { logOut } from '@/lib/actions';
import styles from '../admin.module.css';
import Link from 'next/link';

export default function SettingsPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Configuración</h1>

            <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--border)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--rose-dark)' }}>
                        Cambiar Credenciales
                    </h2>
                    <p style={{ marginBottom: '1.5rem', color: 'var(--text-light)', fontSize: '0.95rem' }}>
                        Actualiza tu email y contraseña de acceso al panel de administración.
                    </p>
                    <Link
                        href="/admin/change-credentials"
                        style={{
                            display: 'inline-block',
                            background: 'var(--rose-primary)',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            transition: 'opacity 0.2s'
                        }}
                    >
                        Cambiar Email y Contraseña
                    </Link>
                </div>

                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--border)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#d32f2f' }}>
                        Cerrar Sesión
                    </h2>
                    <p style={{ marginBottom: '1.5rem', color: 'var(--text-light)', fontSize: '0.95rem' }}>
                        Sal de tu cuenta de administrador de forma segura.
                    </p>
                    <form action={logOut}>
                        <button
                            type="submit"
                            style={{
                                background: '#d32f2f',
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                fontWeight: 600,
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Cerrar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
