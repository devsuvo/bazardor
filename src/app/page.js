import { getProducts } from "@/lib/api";
import { formatBnDate, toBn, formatTaka } from "@/lib/bn";
import { getMovers } from "@/lib/stats";

export default async function Home() {
  const products = await getProducts();
  const risers = getMovers(products, "up");

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-bold">বাজার দর</h1>
      <p className="mt-2 opacity-70">{formatBnDate()}</p>
      <p className="mt-2">মোট পণ্য: {toBn(products.length)}টি</p>
      <ul className="mt-4 list-disc pl-6">
        {risers.map((p) => (
          <li key={p.id}>
            {p.image} {p.nameBn} — {formatTaka(p.today)}
          </li>
        ))}
      </ul>
    </main>
  );
}