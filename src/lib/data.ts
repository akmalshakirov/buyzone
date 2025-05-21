import { Product, Order } from "./types";

export const products: Product[] = [
    {
        id: "1",
        name: "Premium Wireless Headphones",
        price: 149.99,
        description:
            "Experience crystal-clear sound with our premium wireless headphones. Features noise cancellation, 30-hour battery life, and comfortable over-ear design.",
        images: [
            "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ],
        category: "electronics",
        stock: 15,
        rating: 4.8,
        featured: true,
    },
    {
        id: "2",
        name: "Smart Watch Series 5",
        price: 299.99,
        description:
            "Stay connected and track your fitness with our latest smart watch. Features heart rate monitoring, GPS, and a beautiful always-on display.",
        images: [
            "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ],
        category: "electronics",
        stock: 10,
        rating: 4.6,
        featured: true,
    },
    {
        id: "3",
        name: "Organic Cotton T-Shirt",
        price: 29.99,
        description:
            "Ultra-soft, sustainably made t-shirt crafted from 100% organic cotton. Available in multiple colors and sizes.",
        images: [
            "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ],
        category: "clothing",
        stock: 25,
        rating: 4.5,
        featured: false,
    },
    {
        id: "4",
        name: "Modern Coffee Table",
        price: 249.99,
        description:
            "Elevate your living room with this sleek, modern coffee table. Features solid oak construction and minimalist design.",
        images: [
            "https://images.pexels.com/photos/2865903/pexels-photo-2865903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ],
        category: "furniture",
        stock: 5,
        rating: 4.7,
        featured: true,
    },
    {
        id: "5",
        name: "Professional DSLR Camera",
        price: 899.99,
        description:
            "Capture stunning photos and videos with our professional DSLR camera. Includes 24.2MP sensor, 4K video recording, and advanced autofocus.",
        images: [
            "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ],
        category: "electronics",
        stock: 8,
        rating: 4.9,
        featured: true,
    },
    {
        id: "6",
        name: "Leather Weekender Bag",
        price: 199.99,
        description:
            "Premium full-grain leather weekender bag perfect for short trips. Features durable construction, multiple compartments, and timeless design.",
        images: [
            "https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ],
        category: "accessories",
        stock: 12,
        rating: 4.7,
        featured: false,
    },
    {
        id: "7",
        name: "Ceramic Plant Pot Set",
        price: 49.99,
        description:
            "Set of 3 hand-crafted ceramic plant pots in varying sizes. Perfect for indoor plants and home decor.",
        images: [
            "https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ],
        category: "home",
        stock: 20,
        rating: 4.4,
        featured: false,
    },
    {
        id: "8",
        name: "Stainless Steel Water Bottle",
        price: 34.99,
        description:
            "Double-walled, vacuum-insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours. Made from high-quality stainless steel.",
        images: [
            "https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/4066765/pexels-photo-4066765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ],
        category: "accessories",
        stock: 30,
        rating: 4.6,
        featured: false,
    },
];

export const categories = [
    { id: "all", name: "All Categories" },
    { id: "electronics", name: "Electronics" },
    { id: "clothing", name: "Clothing" },
    { id: "furniture", name: "Furniture" },
    { id: "accessories", name: "Accessories" },
    { id: "home", name: "Home & Garden" },
];

export const featuredProducts = products.filter((product) => product.featured);

export const getProductById = (id: string): Product | undefined => {
    return products.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
    if (category === "all") return products;
    return products.filter((product) => product.category === category);
};

export const sampleOrders: Order[] = [
    {
        id: "ord-1",
        user: { id: "user-1", name: "John Doe", email: "john@example.com" },
        items: [
            { product: products[0], quantity: 1 },
            { product: products[2], quantity: 2 },
        ],
        total: products[0].price + products[2].price * 2,
        status: "delivered",
        date: "2023-09-15",
    },
    {
        id: "ord-2",
        user: { id: "user-1", name: "John Doe", email: "john@example.com" },
        items: [{ product: products[4], quantity: 1 }],
        total: products[4].price,
        status: "shipped",
        date: "2023-10-20",
    },
];
