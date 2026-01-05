import styles from "./page.module.css";
import { fetchRandomProducts } from "@/lib/data";

export default async function Home() {
  const randomProducts = await fetchRandomProducts(4);

  return (
    <main className={styles.homeMain}>

      {/* Hero Section */}
      <section className={styles.hero}>

        {/* Left: Branding */}
        <div className={styles.brandingContainer}>
          <div className={styles.logoContainer}>
            <img src="/logo.png" alt="MLR Estudio Creativo Logo" className={styles.logo} />
          </div>

          <h1 className={styles.title}>
            <span className={styles.titleLine}>MLR</span>
            <span className={styles.titleLine}>Estudio</span>
            <span className={styles.titleLine}>Creativo</span>
          </h1>
          <p className={styles.subtitle}>
            Diseño con alma. Agendas, papelería y experiencias creativas.
          </p>

          <a href="/catalogo" className={styles.enterButton}>
            Ingresar
          </a>
        </div>

        {/* Right: Visual Collage (Random) */}
        <div className={styles.collageContainer}>
          {randomProducts.map((product, index) => (
            <img
              key={`collage-${index}`}
              src={product.image_url}
              alt=""
              className={styles.collageImage}
            />
          ))}
        </div>

      </section>

    </main>
  );
}
