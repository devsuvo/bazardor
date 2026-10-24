export const SORT_OPTIONS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

export function sortProducts(products, mode) {
  const list = [...products];
  if (mode === "asc") return list.sort((a, b) => a.today - b.today);
  if (mode === "desc") return list.sort((a, b) => b.today - a.today);
  return list;
}