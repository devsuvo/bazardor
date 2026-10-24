import Link from "next/link";

export default function AuthButtons() {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <Link
        href="/signin"
        className="btn btn-ghost btn-sm sm:btn-md text-sm font-semibold"
      >
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className="btn btn-primary btn-sm sm:btn-md text-sm font-semibold"
      >
        সাইন আপ
      </Link>
    </div>
  );
}