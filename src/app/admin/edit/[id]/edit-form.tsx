'use client';

import { useActionState } from 'react';
import { updateProduct } from '@/lib/actions';
import styles from '../../admin.module.css';
import { Category, Product } from '@/lib/definitions';

export default function EditProductForm({ product, categories }: { product: Product, categories: Category[] }) {
    const updateProductWithId = updateProduct.bind(null, product.id);
    const [state, dispatch] = useActionState(updateProductWithId, undefined);

    return (
        <form action={dispatch} className={styles.form}>
            {state?.message && (
                <p style={{ color: 'red', padding: '0.5rem', background: '#ffebee', borderRadius: '4px' }}>
                    {state.message}
                </p>
            )}
            <div className={styles.inputGroup}>
                <label className={styles.label}>Nombre</label>
                <input name="name" type="text" className={styles.input} required defaultValue={product.name} />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Categoría</label>
                <select name="category_id" className={styles.input} required defaultValue={product.category_id || ""}>
                    <option value="" disabled>Selecciona una categoría</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Precio (€)</label>
                <input name="price" type="number" className={styles.input} required defaultValue={product.price} />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Descripción</label>
                <textarea name="description" className={styles.textarea} required defaultValue={product.description || ""} />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Imagen (Opcional - Deja vacío para mantener la actual)</label>
                <div style={{ marginBottom: '1rem' }}>
                    <img src={product.image_url} alt="Actual" width="100" style={{ borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>
                <input name="image" type="file" accept="image/*" className={styles.fileInput} />
            </div>

            <button type="submit" className={styles.createButton}>
                Actualizar Producto
            </button>
        </form>
    );
}
