import { CategoriesShowcase } from "@/components/home/categories-showcase";
import { CTASection } from "@/components/home/cta-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HeroSection } from "@/components/home/hero-section";

export default function Home() {
    return (
        <div>
            <HeroSection />
            <FeaturedProducts />
            <CategoriesShowcase />
            <CTASection />
        </div>
    );
}
