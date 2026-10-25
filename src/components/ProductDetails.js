import Link from "next/link";
import {
  ARROW,
  CHANGE_COLOR,
  UNIT_LABEL,
  UNIT_SHORT,
  formatNumber,
  formatPct,
  formatTaka,
  formatTakaExact,
} from "@/lib/bn";
import {
  getMarketStats,
  marketAverage,
  sortMarketsByAverage,
} from "@/lib/stats";

function ChangeSentence({ diff }) {
  if (diff > 0) {
    return (
      <>
        গতকালের তুলনায় আজ দাম{" "}
        <strong className="font-semibold">বেড়েছে</strong> · {formatTaka(diff)}
      </>
    );
  }
  if (diff < 0) {
    return (
      <>
        গতকালের তুলনায় আজ দাম{" "}
        <strong className="font-semibold">কমেছে</strong> ·{" "}
        {formatTaka(Math.abs(diff))}
      </>
    );
  }
  return <>গতকালের তুলনায় আজ দামে কোনো পরিবর্তন নেই</>;
}

function StatCard({ label, value, caption, valueClass = "" }) {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 px-5 py-4">
      <p className="text-xs text-base-content/60">{label}</p>
      <p className={`text-2xl font-bold leading-8 ${valueClass}`}>{value}</p>
      <p className="text-xs text-base-content/60">{caption}</p>
    </div>
  );
}

export default function ProductDetails({ product }) {
  const {
    image,
    nameBn,
    unit,
    today,
    yesterday,
    change,
    category,
    categoryNameBn,
    categoryIcon,
    markets,
  } = product;

  const stats = getMarketStats(product);
  const diff = today - yesterday;
  const sortedMarkets = sortMarketsByAverage(markets);

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <nav aria-label="breadcrumb" className="py-2 text-sm">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-primary">
              হোম
            </Link>
          </li>
          <li aria-hidden="true" className="text-base-content/40">
            ›
          </li>
          <li>
            <Link href={`/category/${category}`} className="hover:text-primary">
              {categoryNameBn}
            </Link>
          </li>
          <li aria-hidden="true" className="text-base-content/40">
            ›
          </li>
          <li aria-current="page" className="font-medium">
            {nameBn}
          </li>
        </ol>
      </nav>

      <header className="flex flex-col gap-5 rounded-2xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center">
        <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl">
          {image}
        </span>

        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold leading-9">{nameBn}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Link
              href={`/category/${category}`}
              className="rounded-full bg-base-200 px-3 py-1 text-xs font-semibold hover:bg-base-300"
            >
              {categoryIcon} {categoryNameBn}
            </Link>
            <span className="rounded-full bg-base-200 px-3 py-1 text-xs font-semibold">
              {UNIT_LABEL[unit]}
            </span>
          </div>
          <p className="mt-2 text-sm">
            <ChangeSentence diff={diff} />
          </p>
        </div>

        <div className="rounded-2xl bg-base-200 px-5 py-4 text-center sm:min-w-36">
          <p className="text-sm text-base-content/70">আজকের দাম</p>
          <p className="text-3xl font-bold leading-9">{formatNumber(today)}</p>
          <p className="text-sm text-base-content/70">
            টাকা / {UNIT_SHORT[unit]}
          </p>
          <p
            className={`mt-1 text-sm font-semibold ${CHANGE_COLOR[change.dir]}`}
          >
            {ARROW[change.dir]} {formatPct(change.pct)}
          </p>
        </div>
      </header>

      <section className="space-y-6 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">দামের সারসংক্ষেপ</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard
              label="সর্বনিম্ন দাম"
              value={formatTaka(stats.min)}
              caption="সবচেয়ে কম দামের বাজার"
              valueClass="text-success"
            />
            <StatCard
              label="সর্বাধিক দাম"
              value={formatTaka(stats.max)}
              caption="সবচেয়ে বেশি দামের বাজার"
              valueClass="text-error"
            />
            <StatCard
              label="গড় দাম"
              value={formatTaka(stats.avg)}
              caption={`${UNIT_LABEL[unit]}-এর হিসাবে`}
              valueClass="text-primary"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto rounded-2xl border border-base-300">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="text-base-content/60">
                  <th className="px-4 py-3 text-left font-bold">বাজার</th>
                  <th className="px-4 py-3 text-left font-bold">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-bold">সর্বনিম্ন</th>
                  <th className="px-4 py-3 text-right font-bold">সর্বাধিক</th>
                  <th className="px-4 py-3 text-right font-bold">গড়</th>
                </tr>
              </thead>
              <tbody>
                {sortedMarkets.map((m) => (
                  <tr
                    key={`${m.division}-${m.market}`}
                    className="even:bg-base-200"
                  >
                    <td className="px-4 py-3 font-medium">{m.market}</td>
                    <td className="px-4 py-3 text-base-content/70">
                      {m.division}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {formatTaka(m.min)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {formatTaka(m.max)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {formatTakaExact(marketAverage(m))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div>
        <Link
          href={`/category/${category}`}
          className="btn btn-ghost font-semibold"
        >
          {categoryIcon} সব {categoryNameBn}
        </Link>
      </div>
    </main>
  );
}