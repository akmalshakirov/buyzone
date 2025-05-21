"use client";

import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-context";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
    const { items, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className='container py-12 md:py-20'>
                <h1 className='text-2xl md:text-3xl font-bold mb-6'>
                    Your Cart
                </h1>
                <div className='border rounded-lg bg-card p-6 md:p-8 text-center'>
                    <div className='mx-auto my-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted'>
                        <ShoppingBag className='h-8 w-8 text-muted-foreground' />
                    </div>
                    <h2 className='text-xl font-semibold mb-2'>
                        Your cart is empty
                    </h2>
                    <p className='text-muted-foreground mb-6'>
                        Looks like you haven't added any products to your cart
                        yet.
                    </p>
                    <Link href='/products'>
                        <Button>
                            Continue Shopping
                            <ArrowRight className='ml-2 h-4 w-4' />
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='container py-12 md:py-20'>
            <h1 className='text-2xl md:text-3xl font-bold mb-6'>Your Cart</h1>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <div className='col-span-2'>
                    <div className='border rounded-lg bg-card'>
                        <div className='p-6'>
                            <div className='flex justify-between items-center'>
                                <h2 className='font-semibold'>
                                    {items.length}{" "}
                                    {items.length === 1 ? "item" : "items"}
                                </h2>
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    onClick={clearCart}
                                    className='text-muted-foreground hover:text-destructive'>
                                    Clear Cart
                                </Button>
                            </div>
                        </div>

                        <Separator />

                        <div className='p-6'>
                            <div className='space-y-0'>
                                {items.map((item) => (
                                    <CartItem
                                        key={item.product.id}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className='p-6 pt-0'>
                            <Link href='/products'>
                                <Button variant='ghost' className='group'>
                                    <ArrowRight className='mr-2 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1' />
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='col-span-1'>
                    <CartSummary />
                </div>
            </div>
        </div>
    );
}
