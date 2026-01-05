import { sql } from '@vercel/postgres';
import { Product, Category } from './definitions';

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

export async function fetchCategories() {
    try {
        const data = await sql<Category>`
      SELECT * FROM categories
      ORDER BY name ASC
    `;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch categories.');
    }
}
