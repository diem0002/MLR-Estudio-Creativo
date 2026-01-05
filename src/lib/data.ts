import { sql } from '@vercel/postgres';
import { Product } from './definitions';

export async function fetchProducts() {
    try {
        const data = await sql<Product>`
      SELECT * FROM products
      ORDER BY created_at DESC
    `;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch products.');
    }
}
