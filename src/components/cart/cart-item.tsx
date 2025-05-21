"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";

interface CartItemProps {
    item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCart();
    const { product, quantity } = item;

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1) {
            updateQuantity(product.id, newQuantity);
        }
    };

    const handleRemove = () => {
        removeItem(product.id);
    };

    return (
        <div className='flex flex-col sm:flex-row gap-4 py-6 border-b'>
            <div className='flex-shrink-0 aspect-square w-24 sm:w-32 relative rounded-md overflow-hidden'>
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100px, 128px'
                />
            </div>

            <div className='flex flex-col sm:flex-row flex-1 sm:gap-4 justify-between'>
                <div className='flex-1'>
                    <Link
                        href={`/products/${product.id}`}
                        className='text-lg font-medium hover:underline'>
                        {product.name}
                    </Link>
                    <p className='text-muted-foreground text-sm mb-2'>
                        {product.category}
                    </p>
                    <p className='text-muted-foreground text-sm mb-4 max-w-md line-clamp-2'>
                        {product.description}
                    </p>

                    <Button
                        variant='ghost'
                        size='sm'
                        className='h-8 px-2 text-muted-foreground hover:text-destructive'
                        onClick={handleRemove}>
                        <Trash2 className='h-4 w-4 mr-1.5' />
                        Remove
                    </Button>
                </div>

                <div className='flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2 mt-4 sm:mt-0'>
                    <div className='flex items-center border rounded-md'>
                        <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8 rounded-none'
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1}>
                            <Minus className='h-3 w-3' />
                            <span className='sr-only'>Decrease quantity</span>
                        </Button>

                        <span className='w-10 text-center text-sm'>
                            {quantity}
                        </span>

                        <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8 rounded-none'
                            onClick={() => handleQuantityChange(quantity + 1)}>
                            <Plus className='h-3 w-3' />
                            <span className='sr-only'>Increase quantity</span>
                        </Button>
                    </div>

                    <div className='text-right'>
                        <span className='font-semibold'>
                            ${(product.price * quantity).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
