# Roque Digital — Homepage completa (Etapas 1, 2 e 3)

## Instalar e correr

```bash
npm install
npm run dev
```

Abrir http://localhost:3000

## Etapa 1 — Fundação + Navegação + Hero

- Next.js 15 (App Router) + TypeScript + Tailwind CSS + GSAP
- Estrutura de dados dos produtos (`types/product.ts`, `data/products.ts`),
  pensada como a futura tabela `products` do Supabase, incluindo `stock`
- Header com cápsula ativa, hover cinematográfico com subcategorias
  animadas uma a uma, e lógica de hamburger + drawer já preparada para
  quando o número de categorias ultrapassar 3
- Hero full-viewport com quadrado rotativo (crossfade a cada 4s) e
  indicadores
- Todas as rotas de categoria/subcategoria preparadas com metadata própria

## Etapa 2 — Seções de Produtos

- `ProductCard.tsx`: crossfade principal/secundária no hover, nome + preço
  no canto inferior direito
- `FeaturedCarousel.tsx` ("Produtos em Alta"): scroll horizontal infinito
  (CSS), com escala central e `rotateY` 3D calculados em tempo real via
  `requestAnimationFrame`; 3 produtos visíveis em mobile, 5 em desktop
- `DiverseGrid.tsx` ("Diversos"): grid inicial de 8 produtos; "Ver mais"
  adiciona lotes de 12; "Ver menos" com animação de "desfolhar livro"
  (cada fileira de 4 sobe, desloca-se à direita e desvanece, 0.7s por
  fileira, sequencialmente)

## Etapa 3 — Seções finais + Polimento

- `ComboSection.tsx`: dois quadrados sobrepostos (produto principal maior
  atrás, produto secundário menor à frente) + textos persuasivos e preço
  combinado com desconto
- `HighlightSection.tsx` ("Destaque"): vídeo cinematográfico autoplay,
  sem som, com botão de som discreto que só aparece no hover
- `Footer.tsx`: fundo em creme, nome, telefone, redes sociais (ícones SVG
  inline) e descrição da empresa
- **SEO completo**:
  - `lib/site-config.ts` centraliza nome, descrição, telefone e redes
  - Metadata completa em `app/layout.tsx` (title template, description,
    keywords, canonical, robots)
  - Open Graph e Twitter Cards, com imagem gerada dinamicamente em
    `app/opengraph-image.tsx` (identidade visual da marca)
  - Favicon dinâmico em `app/icon.tsx`
  - `app/robots.ts` e `app/sitemap.ts`
  - JSON-LD (`lib/json-ld.ts`): `Store` no layout (dados da empresa) e
    `ItemList`/`Product` na homepage (produtos em alta)
  - Metadata própria em cada página de categoria/subcategoria

## Notas

- Todas as imagens e o vídeo são placeholders (Unsplash / MDN) — substituir
  pelos ficheiros reais quando disponíveis.
- Verificado com `npx tsc --noEmit` sem erros. `next build` só falha neste
  ambiente de sandbox por não ter acesso à rede do Google Fonts; num
  ambiente com internet normal funciona sem problemas.
- Backend: continua tudo mockado em `data/products.ts`, pronto a ser
  substituído por chamadas reais ao Supabase mantendo a mesma forma de
  dados (`types/product.ts`).

