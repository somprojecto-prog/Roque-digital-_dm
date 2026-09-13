import { NavCategory } from "@/types/product";

// ATENÇÃO FUTURA: quando o número de categorias ultrapassar 3,
// ativar hamburger + drawer (ver components/Header.tsx).
export const navCategories: NavCategory[] = [
  {
    label: "Dispositivos",
    slug: "dispositivos",
    href: "/dispositivos",
    subcategories: [
      { label: "Telefones", slug: "telefones" },
      { label: "Áudio", slug: "audio" },
      { label: "Videojogos", slug: "videogames" },
      { label: "Televisores", slug: "tvs" },
      { label: "Diversos", slug: "diversos" },
    ],
  },
  {
    label: "Moda",
    slug: "moda",
    href: "/moda",
    subcategories: [
      { label: "Roupas", slug: "roupas" },
      { label: "Acessórios", slug: "acessorios" },
      { label: "Calçados", slug: "calcados" },
    ],
  },
  {
    label: "Cosméticos",
    slug: "cosmeticos",
    href: "/cosmeticos",
    subcategories: [
      { label: "Perfumes", slug: "perfumes" },
      { label: "Pele", slug: "pele" },
      { label: "Cabelo", slug: "cabelo" },
    ],
  },
];
