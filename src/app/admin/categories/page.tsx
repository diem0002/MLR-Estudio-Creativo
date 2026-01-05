import Link from 'next/link';
import { fetchCategories } from '@/lib/data';
import { deleteCategory } from '@/lib/actions';
import styles from '../admin.module.css';
import { CreateCategoryForm } from './create-form';

export default async function CategoriesPage() {
    const categories = await fetchCategories();

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Categorías</h1>

            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--rose-dark)' }}>Nueva Categoría</h2>
                <CreateCategoryForm />
            </div>

            <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--rose-dark)' }}>Categorías Existentes</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {categories.map((category) => (
                        <div key={category.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem 1.5rem',
                            background: 'white',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border)',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                        }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{category.name}</span>
                            <form action={deleteCategory.bind(null, category.id)}>
                                <button type="submit" style={{
                                    background: '#d32f2f',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.375rem',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: '0.9rem'
                                }}>
                                    Eliminar
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
