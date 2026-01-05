import styles from './admin.module.css';
import { logOut } from '@/lib/actions';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session) {
        redirect('/login');
    }

    return (
        <div className={styles.adminContainer}>
            <aside className={styles.sidebar}>
                <div>
                    <h2 className={styles.sidebarTitle}>MLR Admin</h2>
                    <nav className={styles.nav}>
                        <Link href="/admin" className={styles.navLink}>
                            Productos
                        </Link>
                        <Link href="/admin/categories" className={styles.navLink}>
                            Categorías
                        </Link>
                        {/* Future: <Link href="/admin/settings" className={styles.navLink}>Configuración</Link> */}
                    </nav>
                </div>

                <form action={logOut}>
                    <button className={styles.logoutButton}>
                        Cerrar Sesión
                    </button>
                </form>
            </aside>

            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
