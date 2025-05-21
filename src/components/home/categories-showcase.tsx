import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const categoryImages = {
    all: "https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    electronics:
        "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    clothing:
        "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    furniture:
        "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    accessories:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    home: "https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
};

export function CategoriesShowcase() {
    return (
        <section className='py-12 md:py-16 bg-muted/30'>
            <div className='container'>
                <div className='text-center mb-10'>
                    <h2 className='text-2xl md:text-3xl font-bold tracking-tight mb-2'>
                        Shop by Category
                    </h2>
                    <p className='text-muted-foreground max-w-3xl mx-auto'>
                        Explore our wide range of carefully curated categories
                        designed to meet all your shopping needs
                    </p>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
                    {categories
                        .filter((cat) => cat.id !== "all")
                        .map((category, index) => (
                            <Link
                                key={category.id}
                                href={`/products?category=${category.id}`}
                                className={cn(
                                    "group relative rounded-lg overflow-hidden aspect-square md:aspect-auto p-[5.604vw]",
                                    index === 0
                                        ? "md:col-span-2 md:row-span-2"
                                        : "",
                                    index === 1
                                        ? "md:col-span-1 md:row-span-1"
                                        : "",
                                    index === 2
                                        ? "md:col-span-1 md:row-span-1"
                                        : ""
                                )}>
                                <div className='absolute inset-0 bg-black/45 group-hover:bg-black/60 transition-colors duration-300 z-10' />
                                <Image
                                    src={
                                        categoryImages[
                                            category.id as keyof typeof categoryImages
                                        ]
                                    }
                                    alt={category.name}
                                    fill
                                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                                />
                                <div className='absolute z-20 flex items-center justify-center text-center p-4'>
                                    <div>
                                        <h3 className='text-xl md:text-2xl font-bold text-white mb-2'>
                                            {category.name}
                                        </h3>
                                        <span className='inline-flex items-center text-sm font-medium text-white underline opacity-90 group-hover:opacity-100'>
                                            Explore Now
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </section>
    );
}
