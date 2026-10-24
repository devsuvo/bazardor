import ProductCard from "./ProductCard";
import { ARROW } from "@/lib/bn";

export default function PriceMovers({ title, dir, products }) {
  if (products.length === 0) return null;
  const color = dir === "up" ? "text-success" : "text-error";

  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
        <span className={`text-base ${color}`}>{ARROW[dir]}</span>
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}