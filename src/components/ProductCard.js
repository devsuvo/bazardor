import Link from "next/link";
import {
  ARROW,
  CHANGE_COLOR,
  UNIT_LABEL,
  formatPct,
} from "@/lib/bn";
import Money from "./Money";

export default function ProductCard({ product }) {
  const { slug, image, nameBn, unit, today, change } = product;

  return (
    <Link
      href={`/product/${slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-4 transition hover:border-primary hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl">
          {image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold leading-6">
            {nameBn}
          </h3>
          <p className="text-xs leading-4 text-base-content/60">
            {UNIT_LABEL[unit]}
          </p>
        </div>
      </div>

      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-xs leading-4 text-base-content/70">আজকের দাম</p>
          <p className="text-xl font-bold leading-7">
            <Money value={today} />
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full bg-base-200 px-2 py-1 text-xs font-semibold leading-4 ${CHANGE_COLOR[change.dir]}`}
        >
          <span>{ARROW[change.dir]}</span>
          <span>{formatPct(change.pct)}</span>
        </span>
      </div>
    </Link>
  );
}