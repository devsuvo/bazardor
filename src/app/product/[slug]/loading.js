export default function Loading() {
  return (
    <main
      className="mx-auto max-w-6xl space-y-6 px-4 py-6"
      aria-busy="true"
      aria-label="লোড হচ্ছে"
    >
      <div className="skeleton h-5 w-56" />
      <div className="skeleton h-[174px] rounded-2xl" />
      <div className="skeleton h-[420px] rounded-2xl" />
    </main>
  );
}