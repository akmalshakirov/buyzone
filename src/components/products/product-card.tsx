"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    product: Product;
    className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product, 1);
    };

    return (
        <Card
            className={cn(
                "overflow-hidden transition-all duration-200 hover:shadow-md group",
                className
            )}>
            <Link href={`/products/${product.id}`}>
                <div className='aspect-square relative overflow-hidden'>
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        className='object-cover transition-transform duration-300 group-hover:scale-105'
                        priority
                    />
                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                        <Button
                            variant='secondary'
                            size='sm'
                            className='mx-2 cursor-pointer'>
                            Quick View
                        </Button>
                    </div>
                </div>
                <CardContent className='p-4'>
                    <div className='flex items-center justify-between mb-2'>
                        <p className='text-sm text-muted-foreground capitalize'>
                            {product.category}
                        </p>
                        <div className='flex items-center'>
                            <span className='text-sm font-medium text-yellow-500'>
                                {product.rating}
                            </span>
                            <svg
                                className='w-4 h-4 text-yellow-500 ml-1'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                        </div>
                    </div>
                    <h3 className='font-medium mb-2 line-clamp-2 text-foreground'>
                        {product.name}
                    </h3>
                    <p className='font-bold text-lg'>
                        ${product.price.toFixed(2)}
                    </p>
                </CardContent>
            </Link>
            <CardFooter className='p-4 pt-0 flex items-center justify-between gap-2'>
                <Button
                    variant='default'
                    size='sm'
                    className='w-full'
                    onClick={handleAddToCart}>
                    <ShoppingCart className='h-4 w-4 mr-2' />
                    Add to Cart
                </Button>
                <Button variant='outline' size='icon' className='shrink-0'>
                    <Heart className='h-4 w-4' />
                    <span className='sr-only'>Add to wishlist</span>
                </Button>
            </CardFooter>
        </Card>
    );
}
