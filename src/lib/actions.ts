'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ProductSchema, CategorySchema } from './zod';
import { sql } from '@vercel/postgres';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function logOut() {
    await signOut();
}

export async function createProduct(prevState: any, formData: FormData) {
    const parse = ProductSchema.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
        description: formData.get('description'),
        image_url: 'https://placeholder.com',
    });

    if (!parse.success) {
        const errorMessages = parse.error.issues.map(issue => issue.message).join(', ');
        return { message: 'Campos inválidos: ' + errorMessages };
    }

    const imageFile = formData.get('image') as File;
    if (!imageFile || imageFile.size === 0) {
        return { message: 'La imagen es obligatoria' };
    }

    try {
        const blob = await put(imageFile.name, imageFile, {
            access: 'public',
        });

        const { name, price, description } = parse.data;
        await sql`
        INSERT INTO products (name, price, description, image_url)
        VALUES (${name}, ${price}, ${description}, ${blob.url})
      `;
    } catch (error: any) {
        console.error(error);
        return { message: 'Error: ' + error.message };
    }

    revalidatePath('/admin');
    redirect('/admin');
}

export async function deleteProduct(id: number, _formData?: FormData): Promise<void> {
    try {
        await sql`DELETE FROM products WHERE id = ${id}`;
        revalidatePath('/admin');
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

export async function createCategory(prevState: any, formData: FormData) {
    const parse = CategorySchema.safeParse({
        name: formData.get('name'),
    });

    if (!parse.success) {
        return { message: 'Nombre inválido' };
    }

    try {
        await sql`
        INSERT INTO categories (name)
        VALUES (${parse.data.name})
      `;
    } catch (error: any) {
        return { message: 'Error: ' + error.message };
    }

    revalidatePath('/admin/categories');
    redirect('/admin/categories');
}

export async function deleteCategory(id: string) {
    try {
        await sql`DELETE FROM categories WHERE id = ${id}`;
        revalidatePath('/admin/categories');
    } catch (error) {
        console.error('Error deleting category:', error);
    }
}
