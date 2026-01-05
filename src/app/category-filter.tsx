'use client';

import { Category } from '@/lib/definitions';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import styles from './page.module.css';

export default function CategoryFilter({ categories }: { categories: Category[] }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const currentCategory = searchParams.get('category');

    const handleFilter = (categoryId: string | null) => {
        const params = new URLSearchParams(searchParams);
        if (categoryId) {
            params.set('category', categoryId);
        } else {
            params.delete('category');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className={styles.filterContainer}>
            <button
                className={`${styles.filterButton} ${!currentCategory ? styles.activeFilter : ''}`}
                onClick={() => handleFilter(null)}
            >
                Todos
            </button>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    className={`${styles.filterButton} ${currentCategory === cat.id ? styles.activeFilter : ''}`}
                    onClick={() => handleFilter(cat.id)}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
}
