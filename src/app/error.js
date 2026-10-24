"use client";

export default function Error({ reset }) {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-20 text-center">
      <div className="text-5xl">⚠️</div>
      <h1 className="text-2xl font-bold">কিছু একটা সমস্যা হয়েছে</h1>
      <p className="text-base-content/70">
        তথ্য আনা যায়নি। একটু পরে আবার চেষ্টা করুন।
      </p>
      <button onClick={() => reset()} className="btn btn-primary">
        আবার চেষ্টা করুন
      </button>
    </main>
  );
}