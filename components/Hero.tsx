"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroProducts } from "@/data/products";
import { gsap } from "@/lib/gsap";

const ROTATION_INTERVAL_MS = 4000;
const CROSSFADE_DURATION_S = 0.4; // "efeito de desgaste"

const HERO_BACKGROUND =
  "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=2400&q=80";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroProducts.length);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  // Efeito de "desgaste": a imagem atual perde opacidade enquanto a
  // próxima entra, num crossfade curto e cinematográfico.
  useEffect(() => {
    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: i === activeIndex ? 1 : 0,
        duration: CROSSFADE_DURATION_S,
        ease: "power1.inOut",
      });
    });
  }, [activeIndex]);

  return (
    <section className="relative flex h-[100svh] w-full items-end overflow-hidden bg-preto">
      {/* Imagem de fundo cinematográfica */}
      <Image
        src={HERO_BACKGROUND}
        alt="Composição cinematográfica de tecnologia, moda e beleza"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay para legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-t from-preto via-preto/50 to-cacau-darker/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-preto/60 via-transparent to-transparent" />

      {/* Texto principal */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-40 lg:px-10 lg:pb-32">
        <div className="max-w-xl">
          <h1 className="font-display text-4xl leading-[1.1] text-creme sm:text-5xl lg:text-6xl">
            Tecnologia, moda e beleza,
            <br />
            com a mesma atenção ao detalhe.
          </h1>
          <p className="mt-5 max-w-md text-base text-creme/70 lg:text-lg">
            Uma seleção cuidada de peças e dispositivos, escolhidos para durar
            e para fazer bem à vista.
          </p>
        </div>
      </div>

      {/* Quadrado rotativo de produtos */}
      <div className="absolute bottom-8 right-6 z-10 flex flex-col items-center gap-3 lg:bottom-14 lg:right-14">
        <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-creme/20 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] sm:h-36 sm:w-36 lg:h-44 lg:w-44">
          {heroProducts.map((product, i) => (
            <div
              key={product.id}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className="absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <Image
                src={product.images.main}
                alt={product.name}
                fill
                className="object-cover"
                sizes="176px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-preto/80 to-transparent px-3 py-2">
                <p className="truncate text-[11px] text-creme/90">
                  {product.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="flex items-center gap-1.5">
          {heroProducts.map((product, i) => (
            <button
              key={product.id}
              aria-label={`Mostrar ${product.name}`}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-5 bg-laranja" : "w-1.5 bg-creme/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
