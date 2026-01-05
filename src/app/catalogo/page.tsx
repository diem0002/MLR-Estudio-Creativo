import { fetchProducts, fetchCategories } from "@/lib/data";
import CategoryFilter from "../category-filter";
import ProductCard from "./product-card";
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
    const whatsappNumber = "34651746423";
    const baseUrl = "https://mlr-estudio-creativo.vercel.app";

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title} style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Catálogo de Productos</h1>

                <Suspense fallback={<div>Loading filters...</div>}>
                    <CategoryFilter categories={categories} />
                </Suspense>

                <div className={styles.grid}>
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            whatsappNumber={whatsappNumber}
                            baseUrl={baseUrl}
                        />
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
