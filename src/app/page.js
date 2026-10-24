import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-6">
      <Hero />

      <section id="সব-পণ্য" className="scroll-mt-40">
        <h2 className="mb-4 text-xl font-bold">সব পণ্য</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}