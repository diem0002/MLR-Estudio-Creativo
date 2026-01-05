const { db } = require('@vercel/postgres');

async function migrate() {
    const client = await db.connect();

    try {
        console.log('Beginning migration v2...');

        // 1. Create Categories Table
        await client.sql`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      );
    `;
        console.log('Created "categories" table');

        // 2. Add category_id to products
        // We start by adding it as nullable
        await client.sql`
      ALTER TABLE products 
      ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id);
    `;
        console.log('Added "category_id" to products table');

        // 3. Seed initial categories
        const initialCategories = ['Agendas', 'Cuadernos', 'Recetarios', 'Accesorios', 'Otros'];

        for (const cat of initialCategories) {
            await client.sql`
            INSERT INTO categories (name) 
            VALUES (${cat}) 
            ON CONFLICT (name) DO NOTHING;
        `;
        }
        console.log('Seeded initial categories');

        // 4. (Optional) Assign a default category to existing products if needed
        // const defaultCat = await client.sql`SELECT id FROM categories WHERE name = 'Otros' LIMIT 1`;
        // await client.sql`UPDATE products SET category_id = ${defaultCat.rows[0].id} WHERE category_id IS NULL`;

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await client.end();
    }
}

migrate().catch(console.error);
