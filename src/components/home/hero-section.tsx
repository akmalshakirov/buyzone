"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
    {
        id: 1,
        title: "Summer Collection 2025",
        description: "Discover our latest arrivals and refresh your style",
        cta: "Shop Now",
        url: "/products?category=clothing",
        image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
        id: 2,
        title: "Tech Essentials",
        description: "The latest gadgets to enhance your digital lifestyle",
        cta: "Explore",
        url: "/products?category=electronics",
        image: "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
        id: 3,
        title: "Home Decor",
        description: "Transform your space with our stylish home collection",
        cta: "Discover",
        url: "/products?category=home",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
];

export function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
            );
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className='relative h-[60vh] overflow-hidden'>
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={cn(
                        "absolute inset-0 transition-opacity duration-1000",
                        currentSlide === index ? "opacity-100" : "opacity-0"
                    )}>
                    <div className='absolute inset-0 bg-black/30 z-10' />
                    <div className='relative h-full w-full'>
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            priority
                            className='object-cover'
                        />
                    </div>
                    <div className='absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4'>
                        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight max-w-3xl'>
                            {slide.title}
                        </h1>
                        <p className='text-lg md:text-xl opacity-90 mb-8 max-w-xl'>
                            {slide.description}
                        </p>
                        <Link href={slide.url}>
                            <Button
                                size='lg'
                                className='bg-white text-black hover:bg-white/90 hover:text-black'>
                                {slide.cta}
                            </Button>
                        </Link>
                    </div>
                </div>
            ))}

            <button
                onClick={prevSlide}
                className='absolute left-4 top-1/2 z-30 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors'
                aria-label='Previous slide'>
                <ChevronLeft className='h-6 w-6 cursor-pointer' />
            </button>

            <button
                onClick={nextSlide}
                className='absolute right-4 top-1/2 z-30 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors'
                aria-label='Next slide'>
                <ChevronRight className='h-6 w-6 cursor-pointer' />
            </button>

            <div className='absolute bottom-4 left-1/2 z-30 -translate-x-1/2 flex space-x-2'>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={cn(
                            "h-2 w-2 rounded-full transition-all",
                            currentSlide === index
                                ? "w-8 bg-white"
                                : "bg-white/50 hover:bg-white/80"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
