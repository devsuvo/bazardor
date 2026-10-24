export function getMarketStats(product) {
  const markets = product.markets ?? [];
  if (markets.length === 0) return { min: 0, max: 0, avg: 0 };

  const min = Math.min(...markets.map((m) => m.min));
  const max = Math.max(...markets.map((m) => m.max));
  const avg =
    markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length;

  return { min, max, avg: Math.round(avg) };
}

export const marketAverage = (m) => (m.min + m.max) / 2;

export function getMovers(products, dir, count = 6) {
  return products
    .filter((p) => p.change.dir === dir)
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, count);
}