import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import UserAvatar from "@/components/UserAvatar";
import SignOutButton from "@/components/SignOutButton";
import Field from "@/components/Field";

export const metadata = { title: "আমার প্রোফাইল — বাজার দর" };

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?next=%2Fprofile");

  const { user } = session;

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-6">
      <header>
        <h1 className="text-2xl font-bold leading-8">আমার প্রোফাইল</h1>
        <p className="text-sm leading-5 text-base-content/70">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </header>

      <section className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-6 sm:flex-row sm:items-center">
        <UserAvatar
          user={user}
          className="h-[70px] w-20 shrink-0 rounded-2xl"
        />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-semibold leading-7">
            {user.name}
          </h2>
          <p className="truncate text-base leading-6 text-base-content/70">
            {user.email}
          </p>
        </div>
        <SignOutButton />
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="text-lg font-semibold leading-7">তথ্য</h2>

        <div className="p-6">
          <div className="flex flex-col gap-4">
            <Field id="name" label="নাম" value={user.name} readOnly />

            <Link
              href="/profile/update"
              className="btn btn-primary w-full font-semibold"
            >
              আপডেট
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}