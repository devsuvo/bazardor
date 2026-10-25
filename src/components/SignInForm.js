"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import Field from "./Field";
import SocialButtons from "./SocialButtons";

export default function SignInForm({ next = "/", fromProtected = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (fromProtected) {
      toast.error("এই পাতা দেখতে আগে সাইন ইন করুন", { id: "protected-route" });
    }
  }, [fromProtected]);

  function fail(message) {
    setFormError(message);
    toast.error(message);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    if (!email.trim() || !password) {
      fail("ইমেইল ও পাসওয়ার্ড দুটোই দিন");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error("sign-in error:", error);
        fail(authErrorMessage(error, "সাইন ইন করা যায়নি"));
        setLoading(false);
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে");
      setTimeout(() => window.location.assign(next), 700);
    } catch (err) {
      console.error("sign-in exception:", err);
      fail("সার্ভারের সাথে যোগাযোগ করা যায়নি, আবার চেষ্টা করুন");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Field
          id="email"
          label="ইমেইল"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          id="password"
          label="পাসওয়ার্ড"
          type="password"
          autoComplete="current-password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {formError && (
          <div
            role="alert"
            className="rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-sm text-error"
          >
            {formError}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full font-semibold"
        >
          {loading && <span className="loading loading-spinner loading-xs" />}
          সাইন ইন
        </button>
      </form>

      <div className="flex items-center gap-4 text-xs">
        <span className="h-px flex-1 bg-base-content/10" />
        অথবা
        <span className="h-px flex-1 bg-base-content/10" />
      </div>

      <SocialButtons callbackURL={next} />

      <p className="text-center text-sm text-base-content/70">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}