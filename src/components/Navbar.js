import Link from "next/link";
import { getCategories } from "@/lib/api";
import { formatBnDate } from "@/lib/bn";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

export default async function Navbar() {
  let categories = [];
  try {
    categories = await getCategories();
  } catch {
    categories = [];
  }

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-lg text-primary-content">
            🛒
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="text-base font-bold leading-6 sm:text-xl sm:leading-7">
              বাজার দর
            </span>
            <span className="truncate text-[11px] leading-4 text-base-content/60 sm:text-xs">
              {formatBnDate()}
            </span>
          </span>
        </Link>

        <AuthButtons />
      </div>

      <nav className="border-t border-base-200 bg-base-100">
        <div className="mx-auto max-w-6xl px-4">
          <NavLinks categories={categories} />
        </div>
      </nav>
    </header>
  );
}