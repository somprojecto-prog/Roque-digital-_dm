"use client";

import { useRef, useState } from "react";
import { diverseProducts } from "@/data/products";
import ProductCard from "./ProductCard";
import { gsap } from "@/lib/gsap";

const INITIAL_COUNT = 8; // 2 fileiras de 4
const BATCH_SIZE = 12; // sempre em grupos de 4 colunas (3 fileiras de 4)
const COLUMN_COUNT = 4;
const COLLAPSE_DURATION_PER_COLUMN = 0.7; // segundos, conforme especificação

export default function DiverseGrid() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const total = diverseProducts.length;
  const visibleProducts = diverseProducts.slice(0, visibleCount);
  const canExpand = visibleCount < total;
  const canCollapse = visibleCount > INITIAL_COUNT;

  const handleVerMais = () => {
    const previousCount = visibleCount;
    const nextCount = Math.min(visibleCount + BATCH_SIZE, total);
    setVisibleCount(nextCount);

    // Anima a entrada suave dos novos produtos (motion que responde
    // diretamente à ação de expandir do utilizador).
    requestAnimationFrame(() => {
      const newItems = itemRefs.current.slice(previousCount, nextCount);
      gsap.fromTo(
        newItems,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.04,
        }
      );
    });
  };

  const handleVerMenos = () => {
    const extraItems = itemRefs.current.slice(INITIAL_COUNT, visibleCount);
    if (extraItems.length === 0 || isCollapsing) return;

    setIsCollapsing(true);

    // "Desfolhar livro": cada coluna de 4 produtos sobe, desloca-se
    // para a direita e perde opacidade — uma coluna de cada vez.
    const rows: (HTMLDivElement | null)[][] = [];
    for (let i = 0; i < extraItems.length; i += COLUMN_COUNT) {
      rows.push(extraItems.slice(i, i + COLUMN_COUNT));
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setVisibleCount(INITIAL_COUNT);
        setIsCollapsing(false);
      },
    });

    rows.forEach((row, index) => {
      tl.to(
        row.filter(Boolean),
        {
          y: -50,
          x: 60,
          opacity: 0,
          duration: COLLAPSE_DURATION_PER_COLUMN,
          ease: "power2.in",
        },
        index * COLLAPSE_DURATION_PER_COLUMN
      );
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="font-display text-3xl text-creme lg:text-4xl">
          Diversos
        </h2>
        {canExpand && (
          <button
            onClick={handleVerMais}
            disabled={isCollapsing}
            className="shrink-0 rounded-full border border-creme/25 px-5 py-2 text-sm text-creme/80 transition-colors hover:border-laranja hover:text-laranja disabled:opacity-40"
          >
            Ver mais
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {visibleProducts.map((product, i) => (
          <div
            key={product.id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
          >
            <ProductCard product={product} sizes="(max-width: 768px) 45vw, 22vw" />
          </div>
        ))}
      </div>

      {canCollapse && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleVerMenos}
            disabled={isCollapsing}
            className="rounded-full border border-creme/25 px-6 py-2 text-sm text-creme/80 transition-colors hover:border-laranja hover:text-laranja disabled:opacity-40"
          >
            Ver menos
          </button>
        </div>
      )}
    </section>
  );
}
