import { fetchProducts, fetchCategories } from "@/lib/data";
import CategoryFilter from "../category-filter";
import styles from "../page.module.css";
import { Suspense } from "react";

export default async function CatalogoPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) {
    const { category } = await searchParams;
    const categoryId = category;
    const products = await fetchProducts(categoryId);
    const categories = await fetchCategories();
    const whatsappNumber = "5491100000000";

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title} style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Catálogo de Productos</h1>

                <Suspense fallback={<div>Loading filters...</div>}>
                    <CategoryFilter categories={categories} />
                </Suspense>

                <div className={styles.grid}>
                    {products.map((product) => (
                        <div key={product.id} className={styles.card}>
                            <div className={styles.cardImageContainer}>
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
                                <a
                                    href={`https://wa.me/${whatsappNumber}?text=Hola, me interesa el producto: ${encodeURIComponent(product.name)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.whatsappButton}
                                >
                                    Me interesa
                                </a>
                            </div>
                        </div>
                    ))}
                    {products.length === 0 && (
                        <div className={styles.gridPlaceholder}>
                            <p>Pronto subiremos nuestros productos...</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
