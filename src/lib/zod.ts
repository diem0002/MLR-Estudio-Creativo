import { z } from 'zod';

export const SignInSchema = z.object({
    email: z.string().email({ message: 'Email inválido.' }),
    password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});

export const ProductSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido.'),
    description: z.string().optional(),
    price: z.coerce.number().gt(0, 'El precio debe ser mayor a 0.'),
    image_url: z.string().url('URL de imagen inválida.'),
});

export const CategorySchema = z.object({
    name: z.string().min(1, 'El nombre es requerido.'),
});
