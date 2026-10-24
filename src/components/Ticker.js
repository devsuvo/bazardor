import { getProducts } from "@/lib/api";
import {
  ARROW,
  CHANGE_COLOR,
  UNIT_SHORT,
  formatNumber,
  formatPct,
} from "@/lib/bn";

const marqueeCss = `
@keyframes bazar-marquee {
  0%   { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}
.bazar-marquee {
  display: flex;
  flex-wrap: nowrap;
  width: max-content;
  will-change: transform;
  animation: bazar-marquee 120s linear infinite;
}
.bazar-marquee:hover {
  animation-play-state: paused;
}
`;

export default async function Ticker() {
  let products = [];
  try {
    products = await getProducts();
  } catch {
    return null;
  }
  if (!Array.isArray(products) || products.length === 0) return null;

  return (
    <section
      aria-label="আজকের দামের তালিকা"
      className="overflow-hidden border-b border-base-300 bg-base-100"
    >
      <style>{marqueeCss}</style>

      <div className="bazar-marquee">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 flex-nowrap"
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {products.map((p) => (
              <li
                key={`${copy}-${p.id}`}
                className="flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap border-r border-base-200 px-4 text-sm"
              >
                <span>{p.image}</span>
                <span className="font-medium">{p.nameBn}</span>
                <span className="text-base-content/70">
                  {formatNumber(p.today)} টাকা/{UNIT_SHORT[p.unit]}
                </span>
                <span className={`font-semibold ${CHANGE_COLOR[p.change.dir]}`}>
                  {ARROW[p.change.dir]} {formatPct(p.change.pct)}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}