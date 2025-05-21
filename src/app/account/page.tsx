"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import { sampleOrders } from "@/lib/data";
import {
    CreditCard,
    Heart,
    LogOut,
    MapPin,
    Settings,
    ShoppingBag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
    const router = useRouter();
    const { user, isAuthenticated, logout } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <div className='container py-12 md:py-16'>
            <div className='grid gap-8'>
                <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
                            My Account
                        </h1>
                        <p className='text-muted-foreground mt-1'>
                            Welcome back, {user.name}
                        </p>
                    </div>

                    <Button variant='outline' onClick={logout}>
                        <LogOut className='mr-2 h-4 w-4' />
                        Sign Out
                    </Button>
                </div>

                <Tabs defaultValue='orders' className='w-full'>
                    <TabsList className='grid grid-cols-2 md:grid-cols-4 mb-6'>
                        <TabsTrigger value='orders'>
                            <ShoppingBag className='mr-2 h-4 w-4' />
                            Orders
                        </TabsTrigger>
                        <TabsTrigger value='wishlist'>
                            <Heart className='mr-2 h-4 w-4' />
                            Wishlist
                        </TabsTrigger>
                        <TabsTrigger value='addresses'>
                            <MapPin className='mr-2 h-4 w-4' />
                            Addresses
                        </TabsTrigger>
                        <TabsTrigger value='settings'>
                            <Settings className='mr-2 h-4 w-4' />
                            Settings
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value='orders'>
                        <h2 className='text-xl font-semibold mb-4'>
                            Recent Orders
                        </h2>

                        {sampleOrders.length > 0 ? (
                            <div className='grid gap-4'>
                                {sampleOrders.map((order) => (
                                    <Card key={order.id}>
                                        <CardHeader className='pb-2'>
                                            <div className='flex flex-col md:flex-row md:items-center justify-between gap-2'>
                                                <div>
                                                    <CardTitle className='text-base'>{`Order #${order.id}`}</CardTitle>
                                                    <CardDescription>
                                                        Placed on {order.date}
                                                    </CardDescription>
                                                </div>
                                                <div className='flex items-center'>
                                                    <span
                                                        className={`inline-flex h-6 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                            order.status ===
                                                            "delivered"
                                                                ? "bg-green-100 text-green-700"
                                                                : order.status ===
                                                                  "shipped"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : order.status ===
                                                                  "processing"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-gray-100 text-gray-700"
                                                        }`}>
                                                        {order.status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            order.status.slice(
                                                                1
                                                            )}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className='pb-2'>
                                            <div className='space-y-2'>
                                                {order.items.map((item) => (
                                                    <div
                                                        key={item.product.id}
                                                        className='flex items-center gap-4'>
                                                        <div className='w-12 h-12 relative rounded bg-muted flex-shrink-0'>
                                                            <img
                                                                src={
                                                                    item.product
                                                                        .images[0]
                                                                }
                                                                alt={
                                                                    item.product
                                                                        .name
                                                                }
                                                                className='w-full h-full object-cover rounded'
                                                            />
                                                        </div>
                                                        <div className='flex-1 min-w-0'>
                                                            <p className='font-medium truncate'>
                                                                {
                                                                    item.product
                                                                        .name
                                                                }
                                                            </p>
                                                            <p className='text-sm text-muted-foreground'>
                                                                Qty:{" "}
                                                                {item.quantity}{" "}
                                                                × $
                                                                {item.product.price.toFixed(
                                                                    2
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter className='flex justify-between pt-4'>
                                            <div>
                                                <p className='text-sm font-medium'>
                                                    Total
                                                </p>
                                                <p className='text-lg font-bold'>
                                                    ${order.total.toFixed(2)}
                                                </p>
                                            </div>
                                            <Button variant='outline' size='sm'>
                                                View Order
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className='text-center py-12 border rounded-lg'>
                                <ShoppingBag className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
                                <h3 className='text-lg font-medium'>
                                    No orders yet
                                </h3>
                                <p className='text-muted-foreground mb-4'>
                                    When you place orders, they will appear here
                                </p>
                                <Button
                                    onClick={() => router.push("/products")}>
                                    Start Shopping
                                </Button>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value='wishlist'>
                        <h2 className='text-xl font-semibold mb-4'>
                            My Wishlist
                        </h2>
                        <div className='text-center py-12 border rounded-lg'>
                            <Heart className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
                            <h3 className='text-lg font-medium'>
                                Your wishlist is empty
                            </h3>
                            <p className='text-muted-foreground mb-4'>
                                Save items you like to your wishlist
                            </p>
                            <Button onClick={() => router.push("/products")}>
                                Start Shopping
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value='addresses'>
                        <div className='flex items-center justify-between mb-4'>
                            <h2 className='text-xl font-semibold'>
                                My Addresses
                            </h2>
                            <Button>Add New Address</Button>
                        </div>

                        <div className='grid md:grid-cols-2 gap-4'>
                            <Card>
                                <CardHeader>
                                    <div className='flex justify-between'>
                                        <CardTitle className='text-base'>
                                            Home
                                        </CardTitle>
                                        <span className='text-xs bg-primary/10 text-primary px-2 py-1 rounded'>
                                            Default
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <address className='text-muted-foreground not-italic'>
                                        123 Main Street
                                        <br />
                                        Apartment 4B
                                        <br />
                                        New York, NY 10001
                                        <br />
                                        United States
                                        <br />
                                        <span className='text-foreground font-medium'>
                                            Phone:
                                        </span>{" "}
                                        (123) 456-7890
                                    </address>
                                </CardContent>
                                <CardFooter className='flex justify-between'>
                                    <Button variant='outline' size='sm'>
                                        Edit
                                    </Button>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        className='text-destructive'>
                                        Remove
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className='text-base'>
                                        Office
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <address className='text-muted-foreground not-italic'>
                                        456 Business Ave
                                        <br />
                                        Suite 200
                                        <br />
                                        San Francisco, CA 94107
                                        <br />
                                        United States
                                        <br />
                                        <span className='text-foreground font-medium'>
                                            Phone:
                                        </span>{" "}
                                        (987) 654-3210
                                    </address>
                                </CardContent>
                                <CardFooter className='flex justify-between'>
                                    <Button variant='outline' size='sm'>
                                        Edit
                                    </Button>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        className='text-destructive'>
                                        Remove
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value='settings'>
                        <h2 className='text-xl font-semibold mb-4'>
                            Account Settings
                        </h2>

                        <div className='space-y-8'>
                            <Card>
                                <CardHeader>
                                    <CardTitle className='text-base'>
                                        Personal Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className='pb-2'>
                                    <div className='grid grid-cols-2 gap-6'>
                                        <div>
                                            <p className='text-sm text-muted-foreground mb-1'>
                                                Full Name
                                            </p>
                                            <p className='font-medium'>
                                                {user.name}
                                            </p>
                                        </div>
                                        <div>
                                            <p className='text-sm text-muted-foreground mb-1'>
                                                Email
                                            </p>
                                            <p className='font-medium'>
                                                {user.email}
                                            </p>
                                        </div>
                                        <div>
                                            <p className='text-sm text-muted-foreground mb-1'>
                                                Phone
                                            </p>
                                            <p className='font-medium'>
                                                +1 (555) 123-4567
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant='outline' size='sm'>
                                        Edit
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className='text-base'>
                                        Payment Methods
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className='pb-2'>
                                    <div className='flex items-center gap-4 border p-4 rounded-lg'>
                                        <CreditCard className='h-8 w-8 text-muted-foreground' />
                                        <div>
                                            <p className='font-medium'>
                                                Visa ending in 4242
                                            </p>
                                            <p className='text-sm text-muted-foreground'>
                                                Expires 12/25
                                            </p>
                                        </div>
                                        <div className='ml-auto flex items-center gap-2'>
                                            <Button variant='ghost' size='sm'>
                                                Edit
                                            </Button>
                                            <Button
                                                variant='ghost'
                                                size='sm'
                                                className='text-destructive'>
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant='outline' size='sm'>
                                        Add Payment Method
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className='text-base'>
                                        Security
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className='pb-2'>
                                    <div className='space-y-4'>
                                        <div>
                                            <p className='font-medium mb-1'>
                                                Password
                                            </p>
                                            <p className='text-sm text-muted-foreground'>
                                                Last changed 3 months ago
                                            </p>
                                        </div>
                                        <Button variant='outline' size='sm'>
                                            Change Password
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
