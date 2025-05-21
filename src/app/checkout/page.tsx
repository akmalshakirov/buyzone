"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Form validation schema
const checkoutSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Please enter a valid email address"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    zip: z.string().min(3, "Postal/ZIP code is required"),
    country: z.string().min(2, "Country is required"),
    paymentMethod: z.enum(["credit", "paypal"]),
    notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
    const router = useRouter();
    const { items, subtotal, clearCart } = useCart();
    const { isAuthenticated, user } = useAuth();
    const { toast } = useToast();

    // Calculate order totals
    const tax = subtotal * 0.08; // 8% tax rate
    const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
    const total = subtotal + tax + shipping;

    // Redirect if not authenticated or cart is empty
    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/login?redirect=/checkout");
        } else if (items.length === 0) {
            toast({
                title: "Empty cart",
                description: "Your cart is empty. Add some products first.",
                variant: "destructive",
            });
            router.push("/products");
        }
    }, [isAuthenticated, items.length, router, toast]);

    // Initialize form
    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            fullName: user?.name || "",
            email: user?.email || "",
            address: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            paymentMethod: "credit",
            notes: "",
        },
    });

    // Form submission handler
    const onSubmit = (data: CheckoutFormValues) => {
        // Simulate checkout process
        setTimeout(() => {
            toast({
                title: "Order placed successfully!",
                description:
                    "Thank you for your purchase. Your order is being processed.",
            });

            clearCart();
            router.push("/account/orders");
        }, 1500);
    };

    if (!isAuthenticated || items.length === 0) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className='container py-12 md:py-16'>
            <div className='flex items-center justify-between mb-8'>
                <h1 className='text-2xl md:text-3xl font-bold'>Checkout</h1>
                <Link href='/cart'>
                    <Button variant='outline' size='sm'>
                        Back to Cart
                    </Button>
                </Link>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <div className='col-span-2'>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-8'>
                            <div className='border rounded-lg p-6 bg-card'>
                                <h2 className='text-lg font-medium mb-4'>
                                    Contact Information
                                </h2>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <FormField
                                        control={form.control}
                                        name='fullName'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='email'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className='border rounded-lg p-6 bg-card'>
                                <h2 className='text-lg font-medium mb-4'>
                                    Shipping Address
                                </h2>

                                <div className='grid grid-cols-1 gap-4'>
                                    <FormField
                                        control={form.control}
                                        name='address'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <FormField
                                            control={form.control}
                                            name='city'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='state'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        State/Province
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <FormField
                                            control={form.control}
                                            name='zip'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Postal/ZIP Code
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='country'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Country
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='border rounded-lg p-6 bg-card'>
                                <h2 className='text-lg font-medium mb-4'>
                                    Payment Method
                                </h2>

                                <FormField
                                    control={form.control}
                                    name='paymentMethod'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Select Payment Method
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='Select payment method' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='credit'>
                                                        Credit Card
                                                    </SelectItem>
                                                    <SelectItem value='paypal'>
                                                        PayPal
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {form.watch("paymentMethod") === "credit" && (
                                    <div className='mt-4 grid grid-cols-1 gap-4'>
                                        <div>
                                            <FormLabel>Card Number</FormLabel>
                                            <Input placeholder='1234 5678 9012 3456' />
                                        </div>

                                        <div className='grid grid-cols-2 gap-4'>
                                            <div>
                                                <FormLabel>
                                                    Expiry Date
                                                </FormLabel>
                                                <Input placeholder='MM/YY' />
                                            </div>
                                            <div>
                                                <FormLabel>CVC</FormLabel>
                                                <Input placeholder='123' />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className='border rounded-lg p-6 bg-card'>
                                <h2 className='text-lg font-medium mb-4'>
                                    Additional Notes
                                </h2>

                                <FormField
                                    control={form.control}
                                    name='notes'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Order Notes (Optional)
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder='Special instructions for delivery or order'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type='submit' size='lg' className='w-full'>
                                Place Order
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className='col-span-1'>
                    <div className='border rounded-lg bg-card mb-4'>
                        <div className='p-6'>
                            <h2 className='font-semibold mb-4'>
                                Order Summary
                            </h2>

                            <div className='max-h-[320px] overflow-y-auto pr-2 mb-4'>
                                {items.map((item) => (
                                    <div
                                        key={item.product.id}
                                        className='flex items-center gap-4 py-3 border-b last:border-b-0'>
                                        <div className='w-16 h-16 relative rounded bg-muted flex-shrink-0'>
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className='w-full h-full object-cover rounded'
                                            />
                                            <div className='absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-[10px] font-medium flex items-center justify-center text-primary-foreground'>
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <p className='font-medium truncate'>
                                                {item.product.name}
                                            </p>
                                            <p className='text-sm text-muted-foreground'>
                                                ${item.product.price.toFixed(2)}
                                            </p>
                                        </div>
                                        <p className='font-medium'>
                                            $
                                            {(
                                                item.product.price *
                                                item.quantity
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        <div className='p-6'>
                            <div className='space-y-3'>
                                <div className='flex justify-between'>
                                    <span className='text-muted-foreground'>
                                        Subtotal
                                    </span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-muted-foreground'>
                                        Taxes
                                    </span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-muted-foreground'>
                                        Shipping
                                    </span>
                                    <span>
                                        {shipping > 0
                                            ? `$${shipping.toFixed(2)}`
                                            : "Free"}
                                    </span>
                                </div>

                                <Separator className='my-2' />

                                <div className='flex justify-between font-semibold text-lg'>
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
