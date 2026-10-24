const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBn = (value) =>
  String(value).replace(/\d/g, (d) => BN_DIGITS[d]);

export const formatNumber = (n) =>
  toBn(new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n));

export const formatTaka = (n) => `${formatNumber(n)} টাকা`;

export const formatPct = (pct) => `${toBn(Math.abs(pct).toFixed(1))}%`;

export const UNIT_LABEL = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export const UNIT_SHORT = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const ARROW = { up: "▲", down: "▼", flat: "—" };

// দাম বাড়লে সবুজ, কমলে লাল (requirement অনুযায়ী)
export const CHANGE_COLOR = {
  up: "text-success",
  down: "text-error",
  flat: "text-base-content/60",
};

export function formatBnDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("weekday")}, ${get("day")} ${get("month")}, ${get("year")}`;
}