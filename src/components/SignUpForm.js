"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import Field from "./Field";
import SocialButtons from "./SocialButtons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();

    if (!name) return toast.error("আপনার নাম লিখুন");
    if (!EMAIL_RE.test(email)) return toast.error("সঠিক ইমেইল দিন");
    if (form.password.length < 8)
      return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (form.password !== form.confirm)
      return toast.error("দুটো পাসওয়ার্ড মিলছে না");

    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password: form.password,
      });

      if (error) {
        toast.error(authErrorMessage(error, "অ্যাকাউন্ট তৈরি করা যায়নি"));
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
      router.push("/signin");
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Field
          id="name"
          label="নাম"
          type="text"
          autoComplete="name"
          placeholder="যেমন: রহিম উদ্দিন"
          value={form.name}
          onChange={update("name")}
        />
        <Field
          id="email"
          label="ইমেইল"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={update("email")}
        />
        <Field
          id="password"
          label="পাসওয়ার্ড"
          type="password"
          autoComplete="new-password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          value={form.password}
          onChange={update("password")}
        />
        <Field
          id="confirm"
          label="পাসওয়ার্ড নিশ্চিত করুন"
          type="password"
          autoComplete="new-password"
          placeholder="আবার লিখুন"
          value={form.confirm}
          onChange={update("confirm")}
        />
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full font-semibold"
        >
          {loading && <span className="loading loading-spinner loading-xs" />}
          অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>

      <div className="flex items-center gap-4 text-xs">
        <span className="h-px flex-1 bg-base-content/10" />
        অথবা
        <span className="h-px flex-1 bg-base-content/10" />
      </div>

      <SocialButtons />

      <p className="text-center text-sm text-base-content/70">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-primary hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}