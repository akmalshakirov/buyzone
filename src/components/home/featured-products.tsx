import { ProductGrid } from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { featuredProducts } from "@/lib/data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function FeaturedProducts() {
    return (
        <section className='py-12 md:py-16'>
            <div className='container'>
                <div className='flex flex-col md:flex-row justify-between items-baseline mb-8'>
                    <div>
                        <h2 className='text-2xl md:text-3xl font-bold tracking-tight'>
                            Featured Products
                        </h2>
                        <p className='text-muted-foreground mt-2'>
                            Our selection of products that are trending right
                            now
                        </p>
                    </div>
                    <Link href='/products'>
                        <Button variant='ghost' className='mt-4 md:mt-0 group'>
                            View All
                            <ChevronRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                        </Button>
                    </Link>
                </div>

                <ProductGrid products={featuredProducts} />
            </div>
        </section>
    );
}
