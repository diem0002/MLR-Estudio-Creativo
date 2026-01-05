import { fetchCategories, fetchProductById } from '@/lib/data';
import EditProductForm from './edit-form';
import styles from '../../admin.module.css';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const id = Number(params.id);
    const [product, categories] = await Promise.all([
        fetchProductById(id),
        fetchCategories(),
    ]);

    if (!product) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Editar Producto</h1>
            <EditProductForm product={product} categories={categories} />
        </div>
    );
}
