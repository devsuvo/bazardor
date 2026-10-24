"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import SortSelect from "./SortSelect";
import { sortProducts } from "@/lib/sort";
import { toBn } from "@/lib/bn";

const chipBase =
  "inline-flex h-6 shrink-0 items-center gap-1.5 rounded-lg border px-2.5 text-[11px] font-semibold transition-colors";

export default function ProductBrowser({ products, categories }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const visible = useMemo(() => {
    const q = query.trim();
    const filtered = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (q === "" || p.nameBn.includes(q))
    );
    return sortProducts(filtered, sort);
  }, [products, query, category, sort]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-4 lg:flex-row lg:items-center">
        <label className="input input-sm w-full lg:w-56">
          <span aria-hidden="true">🔍</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="পণ্যের নাম লিখুন…"
            aria-label="পণ্য খুঁজুন"
          />
        </label>

        <div className="no-scrollbar flex flex-1 items-center gap-1 overflow-x-auto">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`${chipBase} ${
              category === "all"
                ? "border-[#047c37] bg-[#047f39] text-primary-content"
                : "border-transparent hover:border-[#ccd0cc] hover:bg-[#dadeda]"
            }`}
          >
            সব
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.slug)}
              className={`${chipBase} ${
                category === c.slug
                  ? "border-[#047c37] bg-[#047f39] text-primary-content"
                  : "border-transparent hover:border-[#ccd0cc] hover:bg-[#dadeda]"
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.nameBn}</span>
            </button>
          ))}
        </div>

        <SortSelect value={sort} onChange={setSort} />
      </div>

      <p className="text-sm text-base-content/70">
        মোট {toBn(visible.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-base-300 bg-base-100 p-10 text-center text-base-content/70">
          কোনো পণ্য পাওয়া যায়নি।
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}