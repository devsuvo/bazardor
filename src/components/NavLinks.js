"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({ categories }) {
  const pathname = usePathname();

  return (
    <ul className="no-scrollbar flex items-center gap-1 overflow-x-auto py-2">
      {categories.map((c) => {
        const href = `/category/${c.slug}`;
        const active = pathname === href;

        return (
          <li key={c.id} className="shrink-0">
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-colors ${
                active
                  ? "border-[#047c37] bg-[#047f39] text-primary-content"
                  : "border-transparent hover:border-[#ccd0cc] hover:bg-[#dadeda]"
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.nameBn}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}