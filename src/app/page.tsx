import styles from "./page.module.css";
import { fetchProducts, fetchCategories, fetchRandomProducts } from "@/lib/data";
import CategoryFilter from "./category-filter";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    category?: string;
  };
}) {
  const categoryId = searchParams?.category;
  // Parallel fetching
  const [products, categories, randomProducts] = await Promise.all([
    fetchProducts(categoryId),
    fetchCategories(),
    fetchRandomProducts(4)
  ]);

  const whatsappNumber = "5491100000000"; // Generic placeholder

  return (
    <main className={styles.main}>

      {/* Hero Section */}
      <section className={styles.hero}>

        {/* Left: Branding */}
        <div className={styles.brandingContainer}>
          <div className={styles.logoContainer}>
            <img src="/logo.png" alt="MLR Estudio Creativo Logo" className={styles.logo} />
          </div>

          <h1 className={styles.title}>
            MLR Estudio Creativo
          </h1>
          <p className={styles.subtitle}>
            Diseño con alma. Agendas, papelería y experiencias creativas.
          </p>

          <a href="#catalogo" className={styles.enterButton}>
            Ingresar
          </a>
        </div>

        {/* Right: Visual Collage (Random) */}
        <div className={styles.collageContainer}>
          {randomProducts.map((product, index) => (
            <img
              key={`collage - ${index} `}
              src={product.image_url}
              alt=""
              className={styles.collageImage}
            />
          ))}
          {/* If few products, maybe repeat or just show fewer */}
        </div>

      </section>

      {/* Products Section */}
      <section id="catalogo" className={styles.productsSection}>
        <div className={styles.actions}>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.buttonSecondary}
          >
            Contacto Directo
          </a >
        </div >

        {/* Filter */}
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
      </section >

    </main >
  );
}
