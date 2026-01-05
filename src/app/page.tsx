import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          MLR Estudio Creativo
        </h1>
        <p className={styles.subtitle}>
          Diseño con alma. Agendas, papelería y experiencias creativas.
        </p>

        <div className={styles.actions}>
          <button className={styles.buttonPrimary}>
            Ver Catálogo
          </button>
          <Link href="/setup">
            <button className={styles.buttonSecondary}>
              Instalación Automática
            </button>
          </Link>
        </div>

        {/* Placeholder for Product Grid */}
        <div className={styles.gridPlaceholder}>
          <p>Aquí irán los productos destacados...</p>
        </div>
      </div>
    </main>
  );
}
