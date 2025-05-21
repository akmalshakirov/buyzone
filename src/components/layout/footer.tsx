import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className='border-t bg-muted/40'>
            <div className='container py-12 md:py-16'>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8'>
                    <div className='col-span-2 lg:col-span-1'>
                        <h3 className='text-lg font-semibold mb-4'>BuyZone</h3>
                        <p className='text-muted-foreground mb-4'>
                            Your one-stop shop for quality products at great
                            prices.
                        </p>
                        <div className='flex space-x-4'>
                            <Link
                                href='#'
                                className='text-muted-foreground hover:text-foreground transition-colors'>
                                <Facebook className='h-5 w-5' />
                                <span className='sr-only'>Facebook</span>
                            </Link>
                            <Link
                                href='#'
                                className='text-muted-foreground hover:text-foreground transition-colors'>
                                <Instagram className='h-5 w-5' />
                                <span className='sr-only'>Instagram</span>
                            </Link>
                            <Link
                                href='#'
                                className='text-muted-foreground hover:text-foreground transition-colors'>
                                <Twitter className='h-5 w-5' />
                                <span className='sr-only'>Twitter</span>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className='text-sm font-semibold mb-3'>Shop</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href='/products'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/products?category=electronics'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                                    Electronics
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/products?category=clothing'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                                    Clothing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/products?category=home'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                                    Home & Garden
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className='text-sm font-semibold mb-3'>Account</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href='/auth/login'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/auth/register'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/account/orders'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                                    Order History
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/account/wishlist'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                                    Wishlist
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className='text-sm font-semibold mb-3'>
                            Customer Service
                        </h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href='/contact'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/faq'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/shipping'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                                    Shipping & Returns
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/privacy'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className='md:col-span-4 lg:col-span-1'>
                        <h3 className='text-sm font-semibold mb-3'>
                            Newsletter
                        </h3>
                        <p className='text-sm text-muted-foreground mb-4'>
                            Subscribe to our newsletter for the latest products
                            and offers.
                        </p>
                        <form className='flex flex-col sm:flex-row gap-2'>
                            <input
                                type='email'
                                placeholder='Your email'
                                className='flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                            />
                            <button
                                type='submit'
                                className='h-9 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-colors hover:bg-primary/90'>
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className='border-t py-6'>
                <div className='container flex flex-col sm:flex-row justify-between items-center gap-4'>
                    <p className='text-sm text-muted-foreground'>
                        © {new Date().getFullYear()} BuyZone. All rights
                        reserved.
                    </p>
                    <div className='flex items-center space-x-4'>
                        <Link
                            href='/terms'
                            className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                            Terms of Service
                        </Link>
                        <Link
                            href='/privacy'
                            className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
