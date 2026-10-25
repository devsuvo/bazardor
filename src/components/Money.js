import { formatNumber } from "@/lib/bn";

// Figma র মতো: সংখ্যা বড় ও মোটা, "টাকা" ছোট ও মাঝারি
export default function Money({ value }) {
  return (
    <>
      <span>{formatNumber(value)}</span>
      <span className="text-sm font-medium">{" "}টাকা</span>
    </>
  );
}