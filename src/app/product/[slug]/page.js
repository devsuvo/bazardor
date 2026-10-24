import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import ProductDetails from "@/components/ProductDetails";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);
  return {
    title: product
      ? `${product.nameBn} — বাজার দর`
      : "পাতা পাওয়া যায়নি — বাজার দর",
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  // ভুল slug হলে login ছাড়াও ৪০৪ দেখাবে
  const product = await getProduct(slug);
  if (!product) notFound();

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?next=${encodeURIComponent(`/product/${slug}`)}`);
  }

  return <ProductDetails product={product} />;
}