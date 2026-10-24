export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton h-[138px] rounded-2xl" />
      ))}
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="space-y-10" aria-busy="true" aria-label="লোড হচ্ছে">
      {[0, 1].map((i) => (
        <section key={i}>
          <div className="skeleton mb-3 h-7 w-44" />
          <ProductGridSkeleton />
        </section>
      ))}
      <section>
        <div className="skeleton mb-3 h-7 w-28" />
       <div className="skeleton mb-4 h-5 w-48" />
        <ProductGridSkeleton count={9} />
      </section>
    </div>
  );
}