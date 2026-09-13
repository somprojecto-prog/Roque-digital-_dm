"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { featuredProducts } from "@/data/products";
import ProductCard from "./ProductCard";

// Triplicamos a lista para conseguir um loop horizontal contínuo e
// visualmente perfeito: o CSS anima exatamente 1/3 da largura da faixa,
// que corresponde a um conjunto completo de produtos.
const LOOP_MULTIPLIER = 3;
const loopedProducts = Array.from({ length: LOOP_MULTIPLIER }).flatMap(
  (_, setIndex) =>
    featuredProducts.map((product) => ({
      ...product,
      _loopKey: `${product.id}-${setIndex}`,
    }))
);

const MAX_SCALE = 1.16;
const MIN_SCALE = 0.8;
const MAX_TILT_DEG = 10;

export default function FeaturedCarousel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Loop de animação: a cada frame, mede a posição real de cada
    // cartão (já deslocado pela animação CSS da faixa) e aplica
    // escala + inclinação 3D em função da distância ao centro do
    // carrossel — é isto que cria a sensação de profundidade.
    function tick() {
      const container = containerRef.current;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        const halfWidth = containerRect.width / 2;

        cardRefs.current.forEach((el) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const dx = cardCenter - centerX;
          const normalized = Math.min(Math.abs(dx) / halfWidth, 1);

          const scale = MAX_SCALE - normalized * (MAX_SCALE - MIN_SCALE);
          const tilt = (dx / halfWidth) * MAX_TILT_DEG * -1;
          const opacity = 1 - normalized * 0.55;
          const z = Math.round((1 - normalized) * 100);

          el.style.transform = `perspective(1200px) rotateY(${tilt}deg) scale(${scale})`;
          el.style.opacity = String(opacity);
          el.style.zIndex = String(z);
          el.style.boxShadow =
            normalized < 0.15
              ? "0 30px 60px -20px rgba(0,0,0,0.65)"
              : "none";
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const pause = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const resume = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <section className="relative overflow-hidden bg-cacau-darker py-20 lg:py-28">
      <div className="mx-auto mb-10 max-w-7xl px-6 lg:px-10">
        <h2 className="font-display text-3xl text-creme lg:text-4xl">
          Produtos em Alta
        </h2>
        <p className="mt-2 max-w-md text-sm text-creme/60">
          Os artigos mais procurados esta semana, numa só faixa contínua.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full [perspective:1200px]"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <div
          ref={trackRef}
          className="marquee-track flex w-max items-stretch"
          style={{ "--marquee-duration": "48s" } as CSSProperties}
        >
          {loopedProducts.map((product, i) => (
            <div
              key={product._loopKey}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="w-[38vw] flex-none px-2 transition-shadow duration-300 sm:w-[26vw] lg:w-[19vw]"
              style={{ willChange: "transform, opacity" }}
            >
              <ProductCard product={product} sizes="20vw" />
            </div>
          ))}
        </div>

        {/* Vinhetas laterais para reforçar a profundidade cinematográfica */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cacau-darker to-transparent lg:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cacau-darker to-transparent lg:w-32" />
      </div>
    </section>
  );
}
