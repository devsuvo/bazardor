import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AuthShell from "@/components/AuthShell";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export const metadata = { title: "তথ্য আপডেট — বাজার দর" };

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?next=%2Fprofile%2Fupdate");

  return (
    <AuthShell
      title="তথ্য আপডেট করুন"
      subtitle="আপনার নাম বদলাতে নিচের ঘরে নতুন নাম লিখুন।"
    >
      <UpdateProfileForm initialName={session.user.name} />
    </AuthShell>
  );
}