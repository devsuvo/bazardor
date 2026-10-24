import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AuthShell from "@/components/AuthShell";
import SignInForm from "@/components/SignInForm";

export const metadata = { title: "সাইন ইন — বাজার দর" };

export default async function SignInPage({ searchParams }) {
  const { next } = await searchParams;

  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/");

  // শুধু নিজের সাইটের ভেতরের path গ্রহণ করা হবে
  const safe =
    typeof next === "string" && next.startsWith("/") && !next.startsWith("//");

  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <SignInForm next={safe ? next : "/"} fromProtected={safe} />
    </AuthShell>
  );
}