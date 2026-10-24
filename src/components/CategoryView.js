"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import SortSelect from "./SortSelect";
import { sortProducts } from "@/lib/sort";
import { toBn } from "@/lib/bn";

export default function CategoryView({ category, products }) {
  const [sort, setSort] = useState("default");
  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <header className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold leading-8">{category.nameBn}</h1>
          <p className="text-sm text-base-content/70">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </header>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-10 text-center">
          <p className="text-lg font-semibold">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </p>
          <Link href="/" className="btn btn-primary font-semibold">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-end rounded-2xl border border-base-300 bg-base-100 p-4">
            <SortSelect value={sort} onChange={setSort} />
          </div>

          <p className="text-sm text-base-content/70">
            মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}