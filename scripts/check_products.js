const { db } = require('@vercel/postgres');
require('dotenv').config({ path: '.env.local' });

async function checkProducts() {
    const client = await db.connect();
    try {
        const res = await client.sql`SELECT count(*) FROM products`;
        console.log('Product count:', res.rows[0].count);
        const products = await client.sql`SELECT id, name, category_id, image_url FROM products LIMIT 5`;
        console.log('Sample products:', products.rows);
    } catch (err) {
        console.error(err);
    } finally {
        client.end();
    }
}

checkProducts();
