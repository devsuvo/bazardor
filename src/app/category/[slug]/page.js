import { notFound } from "next/navigation";
import CategoryView from "@/components/CategoryView";
import { getCategory, getProductsByCategory } from "@/lib/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug).catch(() => null);
  return {
    title: category
      ? `${category.nameBn} — বাজার দর`
      : "পাতা পাওয়া যায়নি — বাজার দর",
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategory(slug),
    getProductsByCategory(slug),
  ]);

  if (!category) notFound();

  return <CategoryView category={category} products={products} />;
}