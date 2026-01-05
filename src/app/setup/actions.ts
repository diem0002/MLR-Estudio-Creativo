'use server';

import { sql } from '@vercel/postgres';

export async function createTable() {
    try {
        await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image_url TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
        return { success: true, message: "Tabla 'products' creada correctamente." };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}
