"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons({ user }) {
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href="/signin"
          className="btn btn-ghost btn-sm sm:btn-md text-xs font-semibold sm:text-sm"
        >
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="btn btn-primary btn-sm sm:btn-md text-xs font-semibold sm:text-sm"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const firstName = (user.name || "ব্যবহারকারী").split(" ")[0];

  async function handleSignOut() {
    setOpen(false);
    try {
      await authClient.signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      setTimeout(() => window.location.assign("/"), 700);
    } catch {
      toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
    }
  }

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="btn btn-ghost btn-sm sm:btn-md gap-2 px-2 text-sm font-medium"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt=""
            referrerPolicy="no-referrer"
            className="size-8 rounded-[10px] object-cover sm:size-9"
          />
        ) : (
          <span className="flex size-8 items-center justify-center rounded-[10px] bg-primary text-sm font-bold text-primary-content sm:size-9">
            {firstName.charAt(0).toUpperCase()}
          </span>
        )}
        <span className="hidden max-w-24 truncate sm:inline">{firstName}</span>
        <span className="text-xs opacity-60">▾</span>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="মেনু বন্ধ করুন"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-lg"
          >
            <div className="px-3 py-2">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-xs text-base-content/70">
                {user.email}
              </p>
            </div>
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm hover:bg-base-content/10"
            >
              👤 আমার প্রোফাইল
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-sm text-error hover:bg-base-content/10"
            >
              ↩ সাইন আউট
            </button>
          </div>
        </>
      )}
    </div>
  );
}