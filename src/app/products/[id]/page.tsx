"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Truck,
    ShieldCheck,
    ArrowLeft,
    Heart,
    Minus,
    Plus,
    RotateCcw,
    Star,
    ShoppingCart,
} from "lucide-react";
import { getProductById, getProductsByCategory } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/products/product-card";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const router = useRouter();
    const { addItem } = useCart();
    const { toast } = useToast();
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const product = getProductById(params.id);

    if (!product) {
        return (
            <div className='container py-16 text-center'>
                <h1 className='text-2xl font-bold mb-4'>Product Not Found</h1>
                <p className='mb-8'>
                    The product you're looking for doesn't exist or has been
                    removed.
                </p>
                <Button onClick={() => router.push("/products")}>
                    <ArrowLeft className='mr-2 h-4 w-4' />
                    Back to Products
                </Button>
            </div>
        );
    }

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        addItem(product, quantity);
        toast({
            title: `${product.name} added to your cart`,
            description: `Quantity: ${quantity}`,
        });
    };

    const addToWishlist = () => {
        toast({
            title: "Added to wishlist",
            description: `${product.name} has been added to your wishlist`,
        });
    };

    // Get related products (same category)
    const relatedProducts = getProductsByCategory(product.category)
        .filter((p) => p.id !== product.id)
        .slice(0, 4);

    return (
        <div className='container py-8 md:py-12'>
            {/* Back button */}
            <Button
                variant='ghost'
                className='mb-6'
                onClick={() => router.back()}>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back
            </Button>

            <div className='grid md:grid-cols-2 gap-8 lg:gap-16'>
                {/* Product Images */}
                <div className='space-y-4'>
                    <div className='aspect-square relative rounded-lg overflow-hidden border'>
                        <Image
                            src={product.images[activeImageIndex]}
                            alt={product.name}
                            fill
                            className='object-cover'
                            sizes='(max-width: 768px) 100vw, 50vw'
                            priority
                        />
                    </div>

                    {/* Thumbnail gallery */}
                    {product.images.length > 1 && (
                        <div className='flex gap-2 overflow-auto pb-2'>
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                                        activeImageIndex === index
                                            ? "border-primary"
                                            : "border-transparent"
                                    }`}
                                    onClick={() => setActiveImageIndex(index)}>
                                    <Image
                                        src={image}
                                        alt={`${product.name} - view ${
                                            index + 1
                                        }`}
                                        fill
                                        className='object-cover'
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div>
                    <div className='space-y-4'>
                        <div>
                            <p className='text-muted-foreground uppercase text-sm font-medium'>
                                {product.category}
                            </p>
                            <h1 className='text-3xl font-bold mt-1'>
                                {product.name}
                            </h1>
                        </div>

                        <div className='flex items-center gap-2'>
                            <div className='flex'>
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                            i < Math.floor(product.rating)
                                                ? "fill-yellow-500 text-yellow-500"
                                                : "text-muted-foreground"
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className='text-sm text-muted-foreground'>
                                {product.rating} rating
                            </span>
                        </div>

                        <div>
                            <p className='text-3xl font-bold'>
                                ${product.price.toFixed(2)}
                            </p>
                            <p className='text-sm text-muted-foreground'>
                                Inclusive of all taxes
                            </p>
                        </div>

                        <p className='text-muted-foreground'>
                            {product.description}
                        </p>

                        <div
                            className={`text-sm ${
                                product.stock > 0
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}>
                            {product.stock > 0
                                ? `In Stock (${product.stock} available)`
                                : "Out of Stock"}
                        </div>

                        <Separator />

                        <div className='space-y-4'>
                            {/* Quantity selector */}
                            <div>
                                <label className='text-sm font-medium mb-2 block'>
                                    Quantity
                                </label>
                                <div className='flex items-center'>
                                    <Button
                                        variant='outline'
                                        size='icon'
                                        className='h-9 w-9 rounded-r-none'
                                        onClick={() =>
                                            handleQuantityChange(quantity - 1)
                                        }
                                        disabled={quantity <= 1}>
                                        <Minus className='h-3 w-3' />
                                        <span className='sr-only'>
                                            Decrease quantity
                                        </span>
                                    </Button>

                                    <div className='h-9 px-4 flex items-center justify-center border-y w-12'>
                                        {quantity}
                                    </div>

                                    <Button
                                        variant='outline'
                                        size='icon'
                                        className='h-9 w-9 rounded-l-none'
                                        onClick={() =>
                                            handleQuantityChange(quantity + 1)
                                        }
                                        disabled={quantity >= product.stock}>
                                        <Plus className='h-3 w-3' />
                                        <span className='sr-only'>
                                            Increase quantity
                                        </span>
                                    </Button>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className='flex flex-col sm:flex-row gap-2'>
                                <Button
                                    className='flex-1'
                                    size='lg'
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}>
                                    <ShoppingCart className='mr-2 h-4 w-4' />
                                    Add to Cart
                                </Button>

                                <Button
                                    variant='outline'
                                    size='lg'
                                    onClick={addToWishlist}>
                                    <Heart className='h-4 w-4' />
                                    <span className='sr-only sm:not-sr-only sm:ml-2'>
                                        Add to Wishlist
                                    </span>
                                </Button>
                            </div>
                        </div>

                        <Separator />

                        {/* Shipping/Returns info */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='flex items-start gap-2'>
                                <Truck className='h-5 w-5 text-muted-foreground mt-0.5' />
                                <div>
                                    <h4 className='text-sm font-medium'>
                                        Free Shipping
                                    </h4>
                                    <p className='text-xs text-muted-foreground'>
                                        On orders over $100
                                    </p>
                                </div>
                            </div>

                            <div className='flex items-start gap-2'>
                                <RotateCcw className='h-5 w-5 text-muted-foreground mt-0.5' />
                                <div>
                                    <h4 className='text-sm font-medium'>
                                        30-Day Returns
                                    </h4>
                                    <p className='text-xs text-muted-foreground'>
                                        Hassle-free returns
                                    </p>
                                </div>
                            </div>

                            <div className='flex items-start gap-2'>
                                <ShieldCheck className='h-5 w-5 text-muted-foreground mt-0.5' />
                                <div>
                                    <h4 className='text-sm font-medium'>
                                        Secure Payment
                                    </h4>
                                    <p className='text-xs text-muted-foreground'>
                                        Encrypted transaction
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product details tabs */}
            <div className='mt-16'>
                <Tabs defaultValue='description'>
                    <TabsList className='w-full justify-start border-b rounded-none h-auto p-0'>
                        <TabsTrigger
                            value='description'
                            className='rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2'>
                            Description
                        </TabsTrigger>
                        <TabsTrigger
                            value='specifications'
                            className='rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2'>
                            Specifications
                        </TabsTrigger>
                        <TabsTrigger
                            value='reviews'
                            className='rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2'>
                            Reviews
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='description' className='pt-4'>
                        <div className='prose max-w-none'>
                            <p className='text-muted-foreground mb-4'>
                                {product.description}
                            </p>
                            <p className='text-muted-foreground'>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nullam auctor, nunc eget
                                lacinia tincidunt, ex enim tincidunt nunc, at
                                ultricies nunc nisl nec nunc. Sed tincidunt,
                                nisl eget ultricies tincidunt, nisi nisl aliquam
                                nisl, eget aliquam nisl nisl eget nisl.
                            </p>
                        </div>
                    </TabsContent>
                    <TabsContent value='specifications' className='pt-4'>
                        <div className='grid md:grid-cols-2 gap-8'>
                            <div>
                                <h3 className='font-medium mb-2'>
                                    Product Details
                                </h3>
                                <ul className='space-y-2 text-muted-foreground'>
                                    <li className='flex justify-between border-b pb-2'>
                                        <span>Brand</span>
                                        <span className='font-medium text-foreground'>
                                            BuyZone
                                        </span>
                                    </li>
                                    <li className='flex justify-between border-b pb-2'>
                                        <span>Material</span>
                                        <span className='font-medium text-foreground'>
                                            Premium
                                        </span>
                                    </li>
                                    <li className='flex justify-between border-b pb-2'>
                                        <span>Weight</span>
                                        <span className='font-medium text-foreground'>
                                            1.2 kg
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className='font-medium mb-2'>Dimensions</h3>
                                <ul className='space-y-2 text-muted-foreground'>
                                    <li className='flex justify-between border-b pb-2'>
                                        <span>Height</span>
                                        <span className='font-medium text-foreground'>
                                            30 cm
                                        </span>
                                    </li>
                                    <li className='flex justify-between border-b pb-2'>
                                        <span>Width</span>
                                        <span className='font-medium text-foreground'>
                                            20 cm
                                        </span>
                                    </li>
                                    <li className='flex justify-between border-b pb-2'>
                                        <span>Depth</span>
                                        <span className='font-medium text-foreground'>
                                            10 cm
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value='reviews' className='pt-4'>
                        <div className='space-y-6'>
                            <div className='flex items-center gap-4'>
                                <div>
                                    <h3 className='text-2xl font-bold'>
                                        {product.rating}
                                    </h3>
                                    <div className='flex'>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${
                                                    i <
                                                    Math.floor(product.rating)
                                                        ? "fill-yellow-500 text-yellow-500"
                                                        : "text-muted-foreground"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className='text-sm text-muted-foreground mt-1'>
                                        Based on 25 reviews
                                    </p>
                                </div>
                                <Separator
                                    orientation='vertical'
                                    className='h-16'
                                />
                                <div>
                                    <p className='text-sm text-muted-foreground mb-2'>
                                        Share your thoughts with other customers
                                    </p>
                                    <Button variant='outline'>
                                        Write a review
                                    </Button>
                                </div>
                            </div>

                            <Separator />

                            <div className='space-y-4'>
                                <div className='space-y-2'>
                                    <div className='flex items-center gap-2'>
                                        <span className='font-medium'>
                                            Jane Smith
                                        </span>
                                        <span className='text-sm text-muted-foreground'>
                                            • 2 weeks ago
                                        </span>
                                    </div>
                                    <div className='flex'>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-3 w-3 ${
                                                    i < 5
                                                        ? "fill-yellow-500 text-yellow-500"
                                                        : "text-muted-foreground"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className='text-muted-foreground'>
                                        Great product! It arrived quickly and
                                        was exactly as described. The quality is
                                        excellent and I'm very happy with my
                                        purchase.
                                    </p>
                                </div>

                                <Separator />

                                <div className='space-y-2'>
                                    <div className='flex items-center gap-2'>
                                        <span className='font-medium'>
                                            John Doe
                                        </span>
                                        <span className='text-sm text-muted-foreground'>
                                            • 1 month ago
                                        </span>
                                    </div>
                                    <div className='flex'>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-3 w-3 ${
                                                    i < 4
                                                        ? "fill-yellow-500 text-yellow-500"
                                                        : "text-muted-foreground"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className='text-muted-foreground'>
                                        Well made and looks great. Would
                                        definitely buy again from this store.
                                        Shipping was fast and the packaging was
                                        secure.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Related products */}
            {relatedProducts.length > 0 && (
                <div className='mt-16'>
                    <h2 className='text-2xl font-bold mb-8'>
                        You May Also Like
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {relatedProducts.map((product) => (
                            <ProductCard key={product?.id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
