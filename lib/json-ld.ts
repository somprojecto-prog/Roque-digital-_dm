import { Product } from "@/types/product";
import { siteConfig } from "@/lib/site-config";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
    telephone: siteConfig.phone,
    description: siteConfig.description,
    areaServed: "Angola",
    sameAs: Object.values(siteConfig.social),
  };
}

export function buildProductListJsonLd(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.images.main,
        url: `${siteConfig.url}/${product.category}/${product.subcategory}`,
        sku: product.id,
        offers: {
          "@type": "Offer",
          priceCurrency: product.currency,
          price: product.price,
          availability:
            product.stock > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          url: `${siteConfig.url}/${product.category}/${product.subcategory}`,
        },
      },
    })),
  };
}
