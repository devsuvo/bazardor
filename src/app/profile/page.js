import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import UserAvatar from "@/components/UserAvatar";
import SignOutButton from "@/components/SignOutButton";

export const metadata = { title: "আমার প্রোফাইল — বাজার দর" };

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?next=%2Fprofile");

  const { user } = session;

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-6">
      <header>
        <h1 className="text-2xl font-bold leading-8">আমার প্রোফাইল</h1>
        <p className="text-sm text-base-content/70">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </header>

      <section className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-6 sm:flex-row sm:items-center">
        <UserAvatar
          user={user}
          className="size-20 shrink-0 rounded-2xl text-3xl"
        />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-semibold">{user.name}</h2>
          <p className="truncate text-base text-base-content/70">
            {user.email}
          </p>
        </div>
        <SignOutButton />
      </section>

      <section className="space-y-4 rounded-2xl border border-base-300 bg-base-100 p-6">
        <h2 className="text-lg font-semibold">তথ্য</h2>

        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-base-200 px-4 py-3">
            <dt className="text-xs text-base-content/70">নাম</dt>
            <dd className="truncate font-medium">{user.name}</dd>
          </div>
          <div className="rounded-2xl bg-base-200 px-4 py-3">
            <dt className="text-xs text-base-content/70">ইমেইল</dt>
            <dd className="truncate font-medium">{user.email}</dd>
          </div>
        </dl>

        <Link
          href="/profile/update"
          className="btn btn-primary w-full font-semibold"
        >
          আপডেট
        </Link>
      </section>
    </main>
  );
}