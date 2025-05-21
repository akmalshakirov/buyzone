"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navbar() {
    const pathname = usePathname();
    const { totalItems } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    const [mobileSearchVisible, setMobileSearchVisible] = useState(false);

    const toggleMobileSearch = () => {
        setMobileSearchVisible(!mobileSearchVisible);
    };

    return (
        <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='container flex h-16 items-center'>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant='ghost'
                            size='icon'
                            className='md:hidden'>
                            <Menu className='h-5 w-5' />
                            <span className='sr-only'>Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side='left'
                        className='w-[240px] sm:w-[300px]'>
                        <nav className='flex flex-col gap-6'>
                            <Link
                                href='/'
                                className='flex items-center gap-2 font-semibold'>
                                <ShoppingCart className='h-5 w-5' />
                                <span>BuyZone</span>
                            </Link>
                            <div className='flex flex-col space-y-3'>
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={
                                            category.id === "all"
                                                ? "/products"
                                                : `/products?category=${category.id}`
                                        }
                                        className='text-muted-foreground transition-colors hover:text-foreground'>
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>

                <Link
                    href='/'
                    className='hidden md:flex items-center gap-2 font-semibold mr-6'>
                    <ShoppingCart className='h-5 w-5' />
                    <span>BuyZone</span>
                </Link>

                <nav className='hidden md:flex items-center gap-6 text-sm'>
                    {categories.slice(0, 5).map((category) => (
                        <Link
                            key={category.id}
                            href={
                                category.id === "all"
                                    ? "/products"
                                    : `/products?category=${category.id}`
                            }
                            className={cn(
                                "transition-colors hover:text-foreground",
                                pathname.includes(
                                    `/products?category=${category.id}`
                                ) ||
                                    (pathname === "/products" &&
                                        category.id === "all")
                                    ? "text-foreground font-medium"
                                    : "text-muted-foreground"
                            )}>
                            {category.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile logo - centered */}
                <div className='md:hidden flex-1 flex justify-center'>
                    <Link
                        href='/'
                        className='flex items-center gap-1 font-semibold'>
                        <ShoppingCart className='h-5 w-5' />
                        <span>BuyZone</span>
                    </Link>
                </div>

                <div className='hidden md:flex flex-1 items-center gap-2 md:ml-6'>
                    <Input
                        placeholder='Search for products...'
                        className='lg:w-[300px] xl:w-[450px]'
                    />
                    <Button variant='ghost' size='icon'>
                        <Search className='h-4 w-4' />
                        <span className='sr-only'>Search</span>
                    </Button>
                </div>

                <div className='flex items-center gap-2'>
                    <Button
                        variant='ghost'
                        size='icon'
                        className='md:hidden'
                        onClick={toggleMobileSearch}>
                        {mobileSearchVisible ? (
                            <X className='h-5 w-5' />
                        ) : (
                            <Search className='h-5 w-5' />
                        )}
                    </Button>

                    {isAuthenticated ? (
                        <div className='hidden md:flex items-center gap-4'>
                            <Link href='/account/wishlist'>
                                <Button variant='ghost' size='icon'>
                                    <Heart className='h-5 w-5' />
                                    <span className='sr-only'>Wishlist</span>
                                </Button>
                            </Link>
                            <Link href='/account'>
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    className='gap-2'>
                                    <User className='h-4 w-4' />
                                    <span className='hidden lg:inline-block'>
                                        {user?.name}
                                    </span>
                                </Button>
                            </Link>
                            <Button variant='ghost' size='sm' onClick={logout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link href='/auth/login' className='hidden md:block'>
                            <Button variant='ghost' size='sm'>
                                Login
                            </Button>
                        </Link>
                    )}

                    <Link href='/cart'>
                        <Button
                            variant='ghost'
                            size='icon'
                            className='relative'>
                            <ShoppingCart className='h-5 w-5' />
                            {totalItems > 0 && (
                                <span className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground'>
                                    {totalItems}
                                </span>
                            )}
                            <span className='sr-only'>Cart</span>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Mobile Search Bar - Conditional Render */}
            {mobileSearchVisible && (
                <div className='md:hidden px-4 pb-4'>
                    <div className='relative'>
                        <Input
                            placeholder='Search for products...'
                            className='pr-8 w-full'
                        />
                        <Button
                            variant='ghost'
                            size='icon'
                            className='absolute right-0 top-0 h-full'>
                            <Search className='h-4 w-4' />
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}
