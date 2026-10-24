import Link from "next/link";

export default function NotFoundView({
  title = "পাতাটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পাতাটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।",
}) {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-20 text-center">
      <div className="text-6xl">🔍</div>
      <p className="text-5xl font-bold text-primary">৪০৪</p>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="max-w-md text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary mt-2 font-semibold">
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}