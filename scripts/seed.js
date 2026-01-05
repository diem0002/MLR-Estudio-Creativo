require('dotenv').config({ path: '.env.local' });
const { db } = require('@vercel/postgres');
const bcrypt = require('bcryptjs');

async function seed() {
    const client = await db.connect();

    try {
        // Create users table if it doesn't exist
        await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

        console.log(`Created "users" table`);

        // Insert user
        const email = 'admin@admin.com'; // Default email
        const password = await bcrypt.hash('admin123', 10); // Default password

        await client.sql`
      INSERT INTO users (email, password)
      VALUES (${email}, ${password})
      ON CONFLICT (email) DO NOTHING;
    `;

        console.log(`Seeded user ${email}`);
        return {
            message: 'Database seeded successfully',
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    } finally {
        await client.end();
    }
}

seed().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
