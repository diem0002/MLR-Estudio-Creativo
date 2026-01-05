import Link from 'next/link';
import Image from 'next/image';
import { fetchProducts } from '@/lib/data';
import { deleteProduct } from '@/lib/actions';
import styles from './admin.module.css';

export default async function AdminPage() {
    const products = await fetchProducts();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>Panel de Productos</h1>
                <Link href="/admin/create">
                    <button className={styles.createButton}>
                        + Nuevo Producto
                    </button>
                </Link>
            </header>

            <div className={styles.grid}>
                {products.map((product) => (
                    <div key={product.id} className={styles.card}>
                        <div className={styles.cardImageContainer}>
                            {/* Use a placeholder if image fails or use next/image optimization */}
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className={styles.cardImage}
                                loading="lazy"
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>{product.name}</h3>
                            <p className={styles.cardPrice}>${product.price}</p>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                {/* <Link href={`/admin/edit/${product.id}`}>Editar</Link> */}
                                <form action={deleteProduct.bind(null, product.id)}>
                                    <button
                                        type="submit"
                                        style={{ background: 'red', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        Eliminar
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
                {products.length === 0 && (
                    <p>No hay productos cargados todavía.</p>
                )}
            </div>
        </div>
    );
}
