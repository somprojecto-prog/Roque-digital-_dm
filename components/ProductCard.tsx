"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";

export default function ProductCard({
  product,
  className = "",
  sizes = "(max-width: 768px) 40vw, 20vw",
}: {
  product: Product;
  className?: string;
  sizes?: string;
}) {
  return (
    <Link
      href={`/${product.category}/${product.subcategory}`}
      className={`group relative block overflow-hidden rounded-2xl bg-cacau-dark transition-shadow duration-500 hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {/* Imagem principal */}
        <Image
          src={product.images.main}
          alt={product.name}
          fill
          sizes={sizes}
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        {/* Imagem secundária — crossfade no hover */}
        <Image
          src={product.images.hover}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Sombra inferior para legibilidade do preço/nome */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-preto/85 to-transparent" />

        {/* Nome + preço, canto inferior direito */}
        <div className="absolute bottom-3 right-3 text-right">
          <p className="text-sm font-medium text-creme">{product.name}</p>
          <p className="text-xs text-laranja">
            {formatPrice(product.price, product.currency)}
          </p>
        </div>
      </div>
    </Link>
  );
}
