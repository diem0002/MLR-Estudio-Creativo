import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const result = await sql`SELECT security_question FROM users WHERE id = 1 LIMIT 1`;
        const user = result.rows[0];

        if (!user || !user.security_question) {
            return NextResponse.json({ question: null });
        }

        return NextResponse.json({ question: user.security_question });
    } catch (error) {
        console.error('Error fetching security question:', error);
        return NextResponse.json({ question: null }, { status: 500 });
    }
}
