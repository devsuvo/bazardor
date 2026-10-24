import { Suspense } from "react";
import Hero from "@/components/Hero";
import PriceMovers from "@/components/PriceMovers";
import ProductCard from "@/components/ProductCard";
import { HomeSkeleton } from "@/components/Skeletons";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import { getMovers } from "@/lib/stats";

async function HomeContent() {
  const products = await getProducts();

  return (
    <div className="space-y-10">
      <PriceMovers
        title="আজ দাম বেড়েছে"
        dir="up"
        products={getMovers(products, "up")}
      />
      <PriceMovers
        title="আজ দাম কমেছে"
        dir="down"
        products={getMovers(products, "down")}
      />

      <section id="সব-পণ্য" className="scroll-mt-40">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="mb-4 mt-1 text-sm text-base-content/70">
          মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-6">
      <Hero />
      <Suspense fallback={<HomeSkeleton />}>
        <HomeContent />
      </Suspense>
    </main>
  );
}