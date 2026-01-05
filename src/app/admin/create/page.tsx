import { fetchCategories } from '@/lib/data';
import CreateProductForm from './create-form';
import styles from '../admin.module.css';

export default async function CreateProductPage() {
    const categories = await fetchCategories();

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Nuevo Producto</h1>
            <CreateProductForm categories={categories} />
        </div>
    );
}
