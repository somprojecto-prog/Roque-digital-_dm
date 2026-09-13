import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Telefones",
  description:
    "Explore a coleção de Telefones da Roque Digital, disponível muito em breve.",
};

// Página preparada para a Etapa futura de listagem de produtos.
export default function Page() {
  return (
    <main className="min-h-screen bg-cacau-darker">
      <Header />
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-center px-6 pt-40 pb-24 lg:px-10">
        <p className="text-sm text-creme/50">Roque Digital</p>
        <h1 className="mt-2 font-display text-3xl text-creme lg:text-4xl">
          Telefones
        </h1>
        <p className="mt-4 text-creme/60">
          Esta secção está a ser preparada. Muito em breve, aqui verá a
          coleção completa de Telefones.
        </p>
      </div>
    </main>
  );
}
