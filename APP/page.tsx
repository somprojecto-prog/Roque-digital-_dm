import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import DiverseGrid from "@/components/DiverseGrid";
import ComboSection from "@/components/ComboSection";
import HighlightSection from "@/components/HighlightSection";
import Footer from "@/components/Footer";
import { featuredProducts } from "@/data/products";
import { buildProductListJsonLd } from "@/lib/json-ld";

export default function Home() {
  const productListJsonLd = buildProductListJsonLd(featuredProducts);

  return (
    <main className="bg-cacau-darker">
      <Header />
      <Hero />
      <FeaturedCarousel />
      <DiverseGrid />
      <ComboSection />
      <HighlightSection />
      <Footer />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }}
      />
    </main>
  );
}
