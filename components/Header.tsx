"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navCategories } from "@/data/nav-categories";
import { gsap } from "@/lib/gsap";

// ATENÇÃO FUTURA: quando o número de categorias ultrapassar 3,
// este valor passa a `true` e a navegação inteira (incluindo desktop)
// passa a usar o menu hamburger + drawer lateral, em vez da lista inline.
const SHOW_HAMBURGER_ALWAYS = navCategories.length > 3;

export default function Header() {
  const pathname = usePathname();
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Anima as subcategorias a entrar uma a uma (fade + translateY),
  // sempre que uma nova categoria é aberta em hover.
  useEffect(() => {
    if (!openCategory || !panelRef.current) return;
    const items = panelRef.current.querySelectorAll("[data-sub-item]");
    gsap.fromTo(
      items,
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.06,
      }
    );
  }, [openCategory]);

  // Fecha o drawer sempre que a rota muda.
  useEffect(() => {
    setDrawerOpen(false);
    setOpenCategory(null);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-preto/70 backdrop-blur-md border-b border-creme/10"
          : "bg-gradient-to-b from-preto/60 to-transparent"
      }`}
      onMouseLeave={() => setOpenCategory(null)}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo + nome */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full border border-laranja/60 text-sm font-display text-laranja"
          >
            RD
          </span>
          <span className="font-display text-lg tracking-tight text-creme">
            Roque Digital
          </span>
        </Link>

        {/* Navegação desktop inline — apenas quando existirem 3 ou menos categorias */}
        {!SHOW_HAMBURGER_ALWAYS && (
          <ul className="hidden items-center gap-2 lg:flex">
            <NavPill href="/" active={pathname === "/"} label="Início" />
            {navCategories.map((cat) => (
              <li
                key={cat.slug}
                className="relative"
                onMouseEnter={() => setOpenCategory(cat.slug)}
              >
                <NavPill href={cat.href} active={isActive(cat.href)} label={cat.label} />
              </li>
            ))}
          </ul>
        )}

        {/* Botão hamburger: sempre visível em mobile; visível também em desktop
            se o número de categorias ultrapassar 3 (ver SHOW_HAMBURGER_ALWAYS). */}
        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setDrawerOpen(true)}
          className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-creme/20 transition hover:border-laranja/60 ${
            SHOW_HAMBURGER_ALWAYS ? "flex" : "lg:hidden"
          }`}
        >
          <span className="h-px w-4 bg-creme" />
          <span className="h-px w-4 bg-creme" />
        </button>
      </div>

      {/* Painel fosco de subcategorias (hover cinematográfico) */}
      {!SHOW_HAMBURGER_ALWAYS && openCategory && (
        <div
          ref={panelRef}
          className="hidden border-t border-creme/10 bg-cacau-darker/85 backdrop-blur-xl lg:block"
          onMouseEnter={() => setOpenCategory(openCategory)}
        >
          <div className="mx-auto max-w-7xl px-10 py-8">
            <div className="flex flex-col gap-3">
              {navCategories
                .find((c) => c.slug === openCategory)
                ?.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    data-sub-item
                    href={`/${openCategory}/${sub.slug}`}
                    className="w-fit text-sm text-creme/70 transition-colors hover:text-laranja"
                  >
                    {sub.label}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Drawer lateral (mobile, ou desktop quando categorias > 3) */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}

function NavPill({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-1.5 text-sm transition-all duration-300 ${
        active
          ? "border border-laranja/70 text-creme shadow-[0_0_18px_-6px_rgba(217,115,26,0.7)]"
          : "border border-transparent text-creme/70 hover:text-creme"
      }`}
    >
      {label}
    </Link>
  );
}

function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div
      className={`fixed inset-0 z-[60] transition-visibility ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-preto/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-[80%] max-w-sm flex-col bg-cacau-darker px-7 py-8 shadow-2xl transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <span className="font-display text-lg text-creme">Roque Digital</span>
          <button
            aria-label="Fechar menu"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-creme/20 text-creme"
          >
            ×
          </button>
        </div>

        <Link
          href="/"
          onClick={onClose}
          className="border-b border-creme/10 py-4 text-creme/90"
        >
          Início
        </Link>

        {navCategories.map((cat) => (
          <div key={cat.slug} className="border-b border-creme/10">
            <button
              className="flex w-full items-center justify-between py-4 text-left text-creme/90"
              onClick={() =>
                setExpanded((prev) => (prev === cat.slug ? null : cat.slug))
              }
            >
              {cat.label}
              <span className="text-laranja">
                {expanded === cat.slug ? "−" : "+"}
              </span>
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ${
                expanded === cat.slug
                  ? "grid-rows-[1fr] pb-4 opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="flex min-h-0 flex-col gap-3 pl-3">
                {cat.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/${cat.slug}/${sub.slug}`}
                    onClick={onClose}
                    className="text-sm text-creme/60 hover:text-laranja"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
}
