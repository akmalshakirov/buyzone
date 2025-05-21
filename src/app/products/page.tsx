"use client";

import { ProductGrid } from "@/components/products/product-grid";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
    products as allProducts,
    categories,
    getProductsByCategory,
} from "@/lib/data";
import { Product } from "@/lib/types";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category");

    const [selectedCategory, setSelectedCategory] = useState<string>(
        categoryParam || "all"
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [sortOption, setSortOption] = useState("featured");

    // Initialize filtered products based on the URL category parameter
    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [categoryParam]);

    // Filter and sort products when dependencies change
    useEffect(() => {
        let filteredProducts =
            selectedCategory === "all"
                ? [...allProducts]
                : getProductsByCategory(selectedCategory);

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredProducts = filteredProducts.filter(
                (product) =>
                    product.name.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query)
            );
        }

        // Apply price filter
        filteredProducts = filteredProducts.filter(
            (product) =>
                product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        // Apply sorting
        switch (sortOption) {
            case "price-asc":
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case "name-asc":
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "rating-desc":
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case "featured":
            default:
                // Leave in default order (featured first)
                filteredProducts.sort(
                    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
                );
                break;
        }

        setProducts(filteredProducts);
    }, [selectedCategory, searchQuery, priceRange, sortOption]);

    // Reset all filters
    const resetFilters = () => {
        setSelectedCategory("all");
        setSearchQuery("");
        setPriceRange([0, 1000]);
        setSortOption("featured");
    };

    // Calculate price range stats
    const maxPrice = Math.max(...allProducts.map((product) => product.price));

    return (
        <div className='container py-8 md:py-12'>
            <div className='flex items-center justify-between mb-8'>
                <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
                    {selectedCategory === "all"
                        ? "All Products"
                        : categories.find((c) => c.id === selectedCategory)
                              ?.name}
                </h1>

                <div className='flex items-center gap-2'>
                    <Button
                        variant='outline'
                        size='sm'
                        className='md:hidden'
                        onClick={() => setFiltersVisible(!filtersVisible)}>
                        <SlidersHorizontal className='h-4 w-4 mr-2' />
                        Filters
                    </Button>

                    <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='Sort by' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='featured'>Featured</SelectItem>
                            <SelectItem value='price-asc'>
                                Price: Low to High
                            </SelectItem>
                            <SelectItem value='price-desc'>
                                Price: High to Low
                            </SelectItem>
                            <SelectItem value='name-asc'>
                                Name: A to Z
                            </SelectItem>
                            <SelectItem value='rating-desc'>
                                Highest Rated
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className='flex flex-col md:flex-row gap-8'>
                {/* Filters sidebar - hidden on mobile unless toggled */}
                <div
                    className={`md:w-64 space-y-6 ${
                        filtersVisible ? "block" : "hidden"
                    } md:block`}>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-semibold'>Filters</h2>
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={resetFilters}
                            className='h-8 px-2 text-muted-foreground hover:text-foreground'>
                            Reset All
                        </Button>
                    </div>

                    <div className='space-y-4'>
                        <Accordion
                            type='single'
                            collapsible
                            defaultValue='categories'>
                            <AccordionItem value='categories'>
                                <AccordionTrigger className='text-sm font-medium py-2'>
                                    Categories
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className='space-y-1 pt-1'>
                                        {categories.map((category) => (
                                            <Button
                                                key={category.id}
                                                variant='ghost'
                                                size='sm'
                                                className={`justify-start w-full h-8 ${
                                                    selectedCategory ===
                                                    category.id
                                                        ? "text-primary font-medium"
                                                        : "text-muted-foreground"
                                                }`}
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        category.id
                                                    )
                                                }>
                                                {category.name}
                                            </Button>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value='price'>
                                <AccordionTrigger className='text-sm font-medium py-2'>
                                    Price Range
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className='space-y-4 pt-2'>
                                        <Slider
                                            defaultValue={[0, maxPrice]}
                                            min={0}
                                            max={maxPrice}
                                            step={10}
                                            value={priceRange}
                                            onValueChange={setPriceRange}
                                        />
                                        <div className='flex items-center justify-between'>
                                            <span className='text-sm'>
                                                ${priceRange[0]}
                                            </span>
                                            <span className='text-sm'>
                                                ${priceRange[1]}
                                            </span>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Close filters button - mobile only */}
                    <Button
                        className='md:hidden w-full'
                        variant='outline'
                        onClick={() => setFiltersVisible(false)}>
                        Close Filters
                    </Button>
                </div>

                {/* Products section */}
                <div className='flex-1'>
                    {/* Search bar */}
                    <div className='mb-6 max-w-xl'>
                        <div className='relative'>
                            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='Search products...'
                                className='pl-10 pr-10'
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className='absolute right-3 top-1/2 -translate-y-1/2'>
                                    <X className='h-4 w-4 text-muted-foreground hover:text-foreground' />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Active filters indicators */}
                    {(selectedCategory !== "all" ||
                        searchQuery ||
                        priceRange[0] > 0 ||
                        priceRange[1] < maxPrice) && (
                        <div className='mb-6 flex flex-wrap gap-2'>
                            {selectedCategory !== "all" && (
                                <div className='flex items-center gap-1 text-xs bg-secondary px-2 py-1 rounded-full'>
                                    <span>
                                        Category:{" "}
                                        {
                                            categories.find(
                                                (c) => c.id === selectedCategory
                                            )?.name
                                        }
                                    </span>
                                    <button
                                        onClick={() =>
                                            setSelectedCategory("all")
                                        }>
                                        <X className='h-3 w-3' />
                                    </button>
                                </div>
                            )}

                            {searchQuery && (
                                <div className='flex items-center gap-1 text-xs bg-secondary px-2 py-1 rounded-full'>
                                    <span>Search: {searchQuery}</span>
                                    <button onClick={() => setSearchQuery("")}>
                                        <X className='h-3 w-3' />
                                    </button>
                                </div>
                            )}

                            {(priceRange[0] > 0 ||
                                priceRange[1] < maxPrice) && (
                                <div className='flex items-center gap-1 text-xs bg-secondary px-2 py-1 rounded-full'>
                                    <span>
                                        Price: ${priceRange[0]} - $
                                        {priceRange[1]}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setPriceRange([0, maxPrice])
                                        }>
                                        <X className='h-3 w-3' />
                                    </button>
                                </div>
                            )}

                            <button
                                onClick={resetFilters}
                                className='text-xs text-primary hover:underline'>
                                Clear All
                            </button>
                        </div>
                    )}

                    {/* Results count */}
                    <p className='text-sm text-muted-foreground mb-6'>
                        Showing {products.length}{" "}
                        {products.length === 1 ? "product" : "products"}
                    </p>

                    {/* Products grid */}
                    {products.length > 0 ? (
                        <ProductGrid products={products} />
                    ) : (
                        <div className='text-center py-12'>
                            <h3 className='text-lg font-semibold mb-2'>
                                No products found
                            </h3>
                            <p className='text-muted-foreground mb-4'>
                                Try changing your search or filter criteria
                            </p>
                            <Button onClick={resetFilters}>
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
