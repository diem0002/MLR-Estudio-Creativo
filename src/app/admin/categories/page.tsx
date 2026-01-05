import Link from 'next/link';
import { fetchCategories } from '@/lib/data';
import { createCategory, deleteCategory } from '@/lib/actions';
import styles from '../admin.module.css';

export default async function CategoriesPage() {
    const categories = await fetchCategories();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>Categorías</h1>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Create Form */}
                <div className={styles.card}>
                    <h3>Nueva Categoría</h3>
                    <form action={createCategory} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Nombre</label>
                            <input name="name" type="text" className={styles.input} required placeholder="Ej. Agendas" />
                        </div>
                        <button type="submit" className={styles.createButton}>
                            Crear
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className={styles.card}>
                    <h3>Existentes</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {categories.map((cat) => (
                            <li key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                                <span>{cat.name}</span>
                                <form action={deleteCategory.bind(null, cat.id)}>
                                    <button type="submit" style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                                        Eliminar
                                    </button>
                                </form>
                            </li>
                        ))}
                        {categories.length === 0 && <li style={{ padding: '0.5rem 0' }}>No hay categorías.</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
}
