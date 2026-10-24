import Link from "next/link";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 px-4 py-10 sm:py-14">
      <header>
        <h1 className="text-2xl font-bold leading-8">{title}</h1>
        <p className="mt-1 text-sm text-base-content/70">{subtitle}</p>
      </header>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
        {children}
      </div>

      <Link
        href="/"
        className="text-sm text-base-content/60 transition hover:text-primary"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}