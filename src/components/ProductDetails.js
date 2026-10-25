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
import Money from "./Money";

// সারির মাঝের লাইনের রং। Figma তে গাঢ় দেখায়।
// হালকা চাইলে "border-base-content" কে "border-base-content/5" করো।
const ROW_LINE = "border-b border-base-content last:border-b-0";

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
    <div className="rounded-2xl border border-base-300 bg-base-100 px-6 py-4">
      <p className="text-xs leading-[18px] text-base-content/60">{label}</p>
      <p className={`text-2xl font-bold leading-8 ${valueClass}`}>
        <Money value={value} />
      </p>
      <p className="text-xs leading-[18px] text-base-content/60">{caption}</p>
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

      <header className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center">
        <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl">
          {image}
        </span>

        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold leading-9">{nameBn}</h1>
          <p className="text-sm leading-5 text-base-content/70">
            {UNIT_LABEL[unit]} ·{" "}
            <Link
              href={`/category/${category}`}
              className="hover:text-primary hover:underline"
            >
              {categoryNameBn}
            </Link>
          </p>
          <p className="mt-2 text-sm leading-5">
            <ChangeSentence diff={diff} />
          </p>
        </div>

        <div className="rounded-2xl bg-base-200 px-5 py-4 text-center">
          <p className="text-sm leading-5 text-base-content/70">আজকের দাম</p>
          <p className="text-3xl font-bold leading-9">{formatNumber(today)}</p>
          <p className="text-sm leading-5 text-base-content/70">
            টাকা / {UNIT_SHORT[unit]}
          </p>
          <p
            className={`mt-1 text-sm font-semibold leading-5 ${CHANGE_COLOR[change.dir]}`}
          >
            {ARROW[change.dir]} {formatPct(change.pct)}
          </p>
        </div>
      </header>

      <section className="space-y-6 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold leading-7">দামের সারসংক্ষেপ</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard
              label="সর্বনিম্ন দাম"
              value={stats.min}
              caption="সবচেয়ে কম দামের বাজার"
              valueClass="text-success"
            />
            <StatCard
              label="সর্বাধিক দাম"
              value={stats.max}
              caption="সবচেয়ে বেশি দামের বাজার"
              valueClass="text-error"
            />
            <StatCard
              label="গড় দাম"
              value={stats.avg}
              caption={`${UNIT_LABEL[unit]}-এর হিসাবে`}
              valueClass="text-primary"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold leading-7">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-base-300">
            <table className="w-full min-w-[640px] table-fixed text-sm">
              <colgroup>
                <col style={{ width: "28.5%" }} />
                <col style={{ width: "18.5%" }} />
                <col style={{ width: "16%" }} />
                <col style={{ width: "16%" }} />
                <col style={{ width: "21%" }} />
              </colgroup>
              <thead>
                <tr className="border-b border-base-content/5 text-base-content/60">
                  <th className="px-4 pb-[13px] pt-3 text-left font-bold leading-[21px]">
                    বাজার
                  </th>
                  <th className="px-4 pb-[13px] pt-3 text-left font-bold leading-[21px]">
                    বিভাগ
                  </th>
                  <th className="px-4 pb-[13px] pt-3 text-right font-bold leading-[21px]">
                    সর্বনিম্ন
                  </th>
                  <th className="px-4 pb-[13px] pt-3 text-right font-bold leading-[21px]">
                    সর্বাধিক
                  </th>
                  <th className="px-4 pb-[13px] pt-3 text-right font-bold leading-[21px]">
                    গড়
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedMarkets.map((m) => (
                  <tr
                    key={`${m.division}-${m.market}`}
                    className={`${ROW_LINE} even:bg-base-200`}
                  >
                    <td className="px-4 py-3 font-medium leading-[21px]">
                      {m.market}
                    </td>
                    <td className="px-4 py-3 leading-[21px] text-base-content/70">
                      {m.division}
                    </td>
                    <td className="px-4 py-3 text-right leading-[21px]">
                      {formatTaka(m.min)}
                    </td>
                    <td className="px-4 py-3 text-right leading-[21px]">
                      {formatTaka(m.max)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold leading-[21px]">
                      {formatTakaExact(marketAverage(m))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Figma তে এখানে ৪০px খালি জায়গা আছে, কোনো button নেই */}
      <div className="h-10" aria-hidden="true" />
    </main>
  );
}