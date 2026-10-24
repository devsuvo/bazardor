"use client";

import { SORT_OPTIONS } from "@/lib/sort";

export default function SortSelect({ value, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-base-content/70">সাজান</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select select-sm w-auto"
        aria-label="সাজান"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}