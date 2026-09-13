import Image from "next/image";
import Link from "next/link";
import { comboProducts } from "@/data/products";
import { formatPrice } from "@/lib/format";

export default function ComboSection() {
  const [main, secondary] = comboProducts;
  if (!main || !secondary) return null;

  const comboPrice = main.price + secondary.price;
  const savings = Math.round(comboPrice * 0.08);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Texto persuasivo */}
        <div className="order-2 lg:order-1">
          <p className="text-sm text-laranja">Combo exclusivo</p>
          <h2 className="mt-2 font-display text-3xl text-creme lg:text-4xl">
            Melhor juntos
          </h2>

          <div className="mt-8 flex flex-col gap-8">
            <ComboItem
              name={main.name}
              description={main.description}
              price={formatPrice(main.price, main.currency)}
              href={`/${main.category}/${main.subcategory}`}
            />
            <ComboItem
              name={secondary.name}
              description={secondary.description}
              price={formatPrice(secondary.price, secondary.currency)}
              href={`/${secondary.category}/${secondary.subcategory}`}
            />
          </div>

          <div className="mt-10 flex flex-wrap items-baseline gap-3 border-t border-creme/10 pt-6">
            <span className="text-2xl text-creme">
              {formatPrice(comboPrice - savings, main.currency)}
            </span>
            <span className="text-sm text-creme/40 line-through">
              {formatPrice(comboPrice, main.currency)}
            </span>
            <span className="text-sm text-laranja">
              Poupe {formatPrice(savings, main.currency)} ao levar os dois
            </span>
          </div>
        </div>

        {/* Quadrados sobrepostos */}
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto h-[340px] w-full max-w-md sm:h-[420px]">
            <div className="absolute left-0 top-0 h-[85%] w-[85%] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
              <Image
                src={main.images.main}
                alt={main.name}
                fill
                sizes="(max-width: 768px) 80vw, 420px"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 h-[52%] w-[52%] overflow-hidden rounded-[1.5rem] border-4 border-cacau-darker shadow-[0_25px_45px_-15px_rgba(0,0,0,0.75)]">
              <Image
                src={secondary.images.main}
                alt={secondary.name}
                fill
                sizes="(max-width: 768px) 45vw, 220px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComboItem({
  name,
  description,
  price,
  href,
}: {
  name: string;
  description: string;
  price: string;
  href: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg text-creme transition-colors group-hover:text-laranja">
          {name}
        </h3>
        <span className="shrink-0 text-sm text-creme/60">{price}</span>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-creme/60">
        {description}
      </p>
    </Link>
  );
}
