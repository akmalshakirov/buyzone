export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    category: string;
    stock: number;
    rating: number;
    featured: boolean;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Order {
    id: string;
    user: User;
    items: CartItem[];
    total: number;
    status: "pending" | "processing" | "shipped" | "delivered";
    date: string;
}
