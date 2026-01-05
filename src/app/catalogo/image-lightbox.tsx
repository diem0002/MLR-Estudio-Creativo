'use client';

import { useState } from 'react';
import styles from './image-lightbox.module.css';

export default function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    ✕
                </button>
                <img src={src} alt={alt} className={styles.image} />
            </div>
        </div>
    );
}
