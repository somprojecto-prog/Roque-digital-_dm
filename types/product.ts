/**
 * Estrutura de dados idealizada para a tabela `products` no Supabase.
 * Mantida aqui como referência única de tipo, tanto para os dados
 * mockados (fase atual) como para a futura integração real.
 *
 * Sugestão de tabela Supabase:
 *
 * create table products (
 *   id uuid primary key default gen_random_uuid(),
 *   slug text unique not null,
 *   name text not null,
 *   description text not null,
 *   price numeric(10,2) not null,
 *   currency text not null default 'AOA',
 *   category text not null,        -- 'dispositivos' | 'moda' | 'cosmeticos'
 *   subcategory text not null,
 *   image_main text not null,
 *   image_hover text not null,
 *   stock integer not null default 0,
 *   is_featured boolean not null default false,
 *   is_combo boolean not null default false,
 *   tags text[] default '{}',
 *   created_at timestamptz not null default now()
 * );
 */

export type Category = "dispositivos" | "moda" | "cosmeticos";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: Category;
  subcategory: string;
  images: {
    main: string;
    hover: string;
  };
  /** Unidades disponíveis em armazém — ainda não exibido visualmente. */
  stock: number;
  isFeatured?: boolean;
  isCombo?: boolean;
  tags?: string[];
  createdAt: string;
}

export interface NavSubcategory {
  label: string;
  slug: string;
}

export interface NavCategory {
  label: string;
  slug: string;
  href: string;
  subcategories: NavSubcategory[];
}
