export type User = {
    id: string;
    email: string;
    password?: string;
};

export type Product = {
    id: number;
    name: string;
    description?: string;
    price: number;
    image_url: string;
    created_at: Date;
};
