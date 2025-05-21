"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

export function CartSummary() {
    const { items, subtotal, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    // Calculate taxes and shipping
    const tax = subtotal * 0.08; // 8% tax rate
    const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
    const total = subtotal + tax + shipping;

    const handleCheckout = () => {
        if (!isAuthenticated) {
            toast({
                title: "Login required",
                description: "Please login to continue with checkout",
                variant: "destructive",
            });
            router.push("/auth/login?redirect=/checkout");
            return;
        }

        if (items.length === 0) {
            toast({
                title: "Empty cart",
                description: "Your cart is empty. Add some products first.",
                variant: "destructive",
            });
            return;
        }

        setIsCheckingOut(true);

        // Simulate checkout process
        setTimeout(() => {
            router.push("/checkout");
            setIsCheckingOut(false);
        }, 1000);
    };

    return (
        <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-6'>
            <h3 className='font-medium text-lg mb-4'>Order Summary</h3>

            <div className='space-y-3'>
                <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Taxes</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Shipping</span>
                    <span>
                        {shipping > 0 ? `$${shipping.toFixed(2)}` : "Free"}
                    </span>
                </div>

                <Separator className='my-2' />

                <div className='flex justify-between font-semibold text-lg'>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>

            {subtotal > 0 && shipping > 0 && (
                <p className='text-sm text-muted-foreground mt-3'>
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping
                </p>
            )}

            <div className='space-y-3 mt-6'>
                <Button
                    className='w-full'
                    size='lg'
                    onClick={handleCheckout}
                    disabled={isCheckingOut || items.length === 0}>
                    {isCheckingOut ? (
                        <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Processing...
                        </>
                    ) : (
                        "Proceed to Checkout"
                    )}
                </Button>

                <Button
                    variant='outline'
                    className='w-full'
                    onClick={() => router.push("/products")}>
                    Continue Shopping
                </Button>
            </div>
        </div>
    );
}
