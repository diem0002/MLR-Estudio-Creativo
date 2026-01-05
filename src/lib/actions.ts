'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { put, del } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ProductSchema, CategorySchema } from './zod';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

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
        category_id: formData.get('category_id'),
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
            addRandomSuffix: true,
        });

        const { name, price, description, category_id } = parse.data;
        await sql`
        INSERT INTO products (name, price, description, image_url, category_id)
        VALUES (${name}, ${price}, ${description}, ${blob.url}, ${category_id || null})
      `;
    } catch (error: any) {
        console.error(error);
        return { message: 'Error: ' + error.message };
    }

    revalidatePath('/admin');
    revalidatePath('/catalogo');
    revalidatePath('/');
    redirect('/admin');
}

export async function deleteProduct(id: number, _formData?: FormData): Promise<void> {
    try {
        const data = await sql`SELECT image_url FROM products WHERE id = ${id}`;
        const product = data.rows[0];

        if (product && product.image_url && !product.image_url.includes('placeholder')) {
            await del(product.image_url);
        }

        await sql`DELETE FROM products WHERE id = ${id}`;
        revalidatePath('/admin');
        revalidatePath('/catalogo');
        revalidatePath('/');
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

export async function deleteCategory(id: string, _formData?: FormData) {
    try {
        await sql`DELETE FROM categories WHERE id = ${id}`;
        revalidatePath('/admin/categories');
    } catch (error) {
        console.error('Error deleting category:', error);
    }
}

export async function updateProduct(id: number, prevState: any, formData: FormData) {
    const parse = ProductSchema.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
        description: formData.get('description'),
        image_url: 'https://placeholder.com',
        category_id: formData.get('category_id'),
    });

    if (!parse.success) {
        const errorMessages = parse.error.issues.map(issue => issue.message).join(', ');
        return { message: 'Campos inválidos: ' + errorMessages };
    }

    const { name, price, description, category_id } = parse.data;
    const imageFile = formData.get('image') as File;

    try {
        let imageUrlToUpdate = null;

        if (imageFile && imageFile.size > 0) {
            const blob = await put(imageFile.name, imageFile, {
                access: 'public',
                addRandomSuffix: true,
            });
            imageUrlToUpdate = blob.url;

            const oldData = await sql`SELECT image_url FROM products WHERE id = ${id}`;
            const oldProduct = oldData.rows[0];
            if (oldProduct && oldProduct.image_url && !oldProduct.image_url.includes('placeholder')) {
                await del(oldProduct.image_url);
            }
        }

        if (imageUrlToUpdate) {
            await sql`
                UPDATE products 
                SET name = ${name}, price = ${price}, description = ${description}, category_id = ${category_id || null}, image_url = ${imageUrlToUpdate}
                WHERE id = ${id}
            `;
        } else {
            await sql`
                UPDATE products 
                SET name = ${name}, price = ${price}, description = ${description}, category_id = ${category_id || null}
                WHERE id = ${id}
            `;
        }

    } catch (error: any) {
        return { message: 'Error: ' + error.message };
    }

    revalidatePath('/admin');
    revalidatePath('/catalogo');
    revalidatePath('/');
    redirect('/admin');
}

export async function updateCredentials(prevState: any, formData: FormData) {
    const currentPassword = formData.get('currentPassword') as string;
    const newEmail = formData.get('newEmail') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!currentPassword || !newEmail || !newPassword || !confirmPassword) {
        return { message: 'Todos los campos son obligatorios' };
    }

    if (newPassword !== confirmPassword) {
        return { message: 'Las contraseñas no coinciden' };
    }

    if (newPassword.length < 6) {
        return { message: 'La contraseña debe tener al menos 6 caracteres' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
        return { message: 'Email inválido' };
    }

    try {
        const result = await sql`SELECT * FROM users WHERE email = 'admin@example.com' OR id = 1 LIMIT 1`;
        const user = result.rows[0];

        if (!user) {
            return { message: 'Usuario no encontrado' };
        }

        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            return { message: 'Contraseña actual incorrecta' };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await sql`
            UPDATE users 
            SET email = ${newEmail}, password = ${hashedPassword}
            WHERE id = ${user.id}
        `;

        return { message: '✓ Credenciales actualizadas con éxito. Por favor, inicia sesión nuevamente.' };
    } catch (error: any) {
        console.error('Error updating credentials:', error);
        return { message: 'Error al actualizar credenciales: ' + error.message };
    }
}
