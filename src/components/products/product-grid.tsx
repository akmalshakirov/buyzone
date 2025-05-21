import { ProductCard } from "@/components/products/product-card";
import { Product } from "@/lib/types";

interface ProductGridProps {
    products: Product[];
    className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
    return (
        <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
