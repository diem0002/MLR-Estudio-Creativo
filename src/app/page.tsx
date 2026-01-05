import styles from "./page.module.css";
import { fetchProducts } from "@/lib/data";

export default async function Home() {
  const products = await fetchProducts();
  const whatsappNumber = "5491100000000"; // Generic placeholder

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          MLR Estudio Creativo
        </h1>
        <p className={styles.subtitle}>
          Diseño con alma. Agendas, papelería y experiencias creativas.
        </p>

        <div className={styles.actions}>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.buttonSecondary}
          >
            Contacto
          </a>
        </div>

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
                  Comprar / Consultar
                </a>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className={styles.gridPlaceholder}>
              <p>Pronto subiremos nustros productos...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
