'use client';

import { useState } from 'react';
import styles from '../page.module.css';
import ImageLightbox from './image-lightbox';

export default function ProductCard({
    product,
    whatsappNumber,
    baseUrl
}: {
    product: any;
    whatsappNumber: string;
    baseUrl: string;
}) {
    const [showLightbox, setShowLightbox] = useState(false);

    return (
        <>
            <div className={styles.card}>
                <div className={styles.cardImageContainer} onClick={() => setShowLightbox(true)} style={{ cursor: 'pointer' }}>
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className={styles.cardImage}
                        loading="lazy"
                    />
                </div>
                <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{product.name}</h3>
                    <p className={styles.cardPrice}>€{product.price}</p>
                    <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola, me interesa este producto:\n\n${product.name}\n${baseUrl}/catalogo\n\nImagen: ${product.image_url}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsappButton}
                    >
                        Me interesa
                    </a>
                </div>
            </div>

            {showLightbox && (
                <ImageLightbox
                    src={product.image_url}
                    alt={product.name}
                    onClose={() => setShowLightbox(false)}
                />
            )}
        </>
    );
}
