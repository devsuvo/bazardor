import { ProductGridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <main
      className="mx-auto max-w-6xl space-y-6 px-4 py-6"
      aria-busy="true"
      aria-label="লোড হচ্ছে"
    >
      <div className="skeleton h-[94px] rounded-2xl" />
      <div className="skeleton h-[66px] rounded-2xl" />
      <div className="skeleton h-5 w-48" />
      <ProductGridSkeleton count={6} />
    </main>
  );
}