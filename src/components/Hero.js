import Image from "next/image";
import { formatBnDate } from "@/lib/bn";

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-3xl border border-base-300 bg-base-100">
      <div className="flex flex-col-reverse items-center gap-6 px-5 py-8 md:flex-row md:justify-between md:gap-10 md:px-10 md:py-10">
        <div className="flex w-full flex-col items-start gap-2 md:max-w-xl">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {formatBnDate()}
          </span>

          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-1 text-base leading-6 text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="btn btn-primary btn-sm sm:btn-md mt-3 font-semibold"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <Image
          src="/bazar-hero.png"
          alt="বাজারের ঝুড়িতে সাজানো সবজি ও ফল"
          width={315}
          height={263}
          priority
          className="h-auto w-48 shrink-0 sm:w-64 md:w-[315px]"
        />
      </div>
    </section>
  );
}