"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Field from "./Field";

export default function UpdateProfileForm({ initialName }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }
    if (trimmed === initialName) {
      toast("নামে কোনো পরিবর্তন করা হয়নি", { icon: "ℹ️" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.updateUser({ name: trimmed });

      if (error) {
        toast.error("তথ্য আপডেট করা যায়নি, আবার চেষ্টা করুন");
        return;
      }

      toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <Field
        id="name"
        label="নাম"
        type="text"
        autoComplete="name"
        placeholder="যেমন: রহিম উদ্দিন"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full font-semibold"
      >
        {loading && <span className="loading loading-spinner loading-xs" />}
        তথ্য আপডেট করুন
      </button>
      <Link href="/profile" className="btn btn-ghost w-full font-semibold">
        বাতিল করুন
      </Link>
    </form>
  );
}