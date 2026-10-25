# 🛒 বাজার দর (BazarDor)

> প্রয়োজনীয় পণ্যের দাম এক নজরে।

**বাজার দর** হলো একটি বাংলা বাজারদর-তথ্য ওয়েব অ্যাপ। এখানে চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম, গতকালের তুলনায় দামের পরিবর্তন এবং বিভিন্ন বাজারের সর্বনিম্ন, সর্বাধিক ও গড় দাম এক জায়গায় দেখা যায়।

**BazarDor** is a Bangla grocery price tracker built with Next.js (App Router). It shows today's prices for everyday essentials, price movement against yesterday, and market-wise minimum, maximum and average prices, with a protected details page and Better Auth based authentication.

🔗 **Live Demo:** `এখানে-deploy-এর-পর-Vercel-এর-লিংক-বসবে`
📦 **Repository:** [github.com/devsuvo/bazardor](https://github.com/devsuvo/bazardor)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)
![daisyUI](https://img.shields.io/badge/daisyUI-5-5A0EF8)
![Better Auth](https://img.shields.io/badge/Better_Auth-1.7-05893E)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)

---

## ✨ প্রধান ফিচার (Key Features)

1. **অসীম দামের ticker** — Navbar এর নিচে সব পণ্যের `emoji + নাম + দাম টাকা/একক + ▲/▼ %` একটানা ঘুরতে থাকে (mouse রাখলে থামে)।
2. **আজ কী বেড়েছে, কী কমেছে** — Home পাতায় দাম সবচেয়ে বেশি বাড়া ও কমা ৬টি করে পণ্য আলাদা section এ।
3. **সব পণ্যের responsive grid** — প্রতিটি card এ emoji, নাম, একক, বাংলা সংখ্যায় আজকের দাম ও পরিবর্তনের badge। ছোট স্ক্রিনে ১ কলাম, tablet এ ২, desktop এ ৩।
4. **Category পাতা** — আইকনসহ শিরোনাম, সংখ্যা ধরে সাজানোর dropdown (ডিফল্ট / কম থেকে বেশি / বেশি থেকে কম), loading skeleton, এবং ভুল বা খালি category র জন্য "হোম পেজে ফিরে যান" সহ খালি-অবস্থা।
5. **সুরক্ষিত পণ্য-বিবরণ পাতা** — শুধু login করা ব্যবহারকারীর জন্য। সর্বনিম্ন, সর্বাধিক ও গড় দাম এবং ১২টি বাজারের (বিভাগসহ) বাজারভিত্তিক দামের table।
6. **Better Auth দিয়ে authentication** — Email/Password, Google ও GitHub login; সফল, ব্যর্থ ও redirect এর জন্য toast বার্তা।
7. **Profile ও তথ্য আপডেট** — নিজের নাম ও ইমেইল দেখা, আলাদা route এ নাম আপডেট (`updateUser`)।
8. **বাংলা সংখ্যা ও তারিখ** — সব দাম ও শতাংশ বাংলা অঙ্কে, আজকের তারিখ বাংলায়। Sort করার সময় সংখ্যার মান ধরে হিসাব হয়, লেখা ধরে নয়।
9. **পুরোপুরি responsive** — mobile, tablet ও desktop তিনটাতেই Navbar, ticker, hero ও grid ঠিকভাবে সাজে।
10. **404 ও error হ্যান্ডলিং** — অজানা route (যেমন `/category/invalid`, `/product/unknown`) এ বন্ধুত্বপূর্ণ ৪০৪ পাতা। API ব্যর্থ হলে একাধিক fallback URL।

---

## 🧰 ব্যবহৃত প্রযুক্তি (Technologies Used)

| প্রযুক্তি | কাজ |
|---|---|
| [Next.js 16](https://nextjs.org/) (App Router) | UI, routing, server components |
| [React 19](https://react.dev/) | কম্পোনেন্ট-ভিত্তিক UI |
| [Tailwind CSS 4](https://tailwindcss.com/) | স্টাইলিং ও responsive layout |
| [daisyUI 5](https://daisyui.com/) | কম্পোনেন্ট library ও কাস্টম `bazardor` theme |
| [Better Auth](https://better-auth.com/) | Email/Password, Google, GitHub authentication |
| [MongoDB Atlas](https://www.mongodb.com/atlas) + `@better-auth/mongo-adapter` | user ও session সংরক্ষণ |
| [react-hot-toast](https://react-hot-toast.com/) | toast বার্তা |
| [Hind Siliguri](https://fonts.google.com/specimen/Hind+Siliguri) | বাংলা ফন্ট (`next/font`) |
| JavaScript (ES2023) | ভাষা |

---

## 🗺️ Routes

| Route | বিবরণ | Login লাগবে? |
|---|---|---|
| `/` | Home: hero, দাম বাড়া/কমা, সব পণ্য | না |
| `/category/[slug]` | Category পাতা (sort সহ) | না |
| `/product/[slug]` | পণ্যের বিস্তারিত ও বাজারভিত্তিক দাম | **হ্যাঁ** |
| `/signin` | সাইন ইন | না |
| `/signup` | সাইন আপ | না |
| `/profile` | আমার প্রোফাইল | **হ্যাঁ** |
| `/profile/update` | নাম আপডেট | **হ্যাঁ** |
| যেকোনো অজানা route | ৪০৪ পাতা | না |

---

## 🚀 চালানোর নিয়ম (Getting Started)

### ১. Clone ও ইনস্টল

```bash
git clone https://github.com/devsuvo/bazardor.git
cd bazardor
npm install
```

### ২. `.env.local` ফাইল বানান

প্রজেক্টের root এ `.env.local` নামে ফাইল বানিয়ে নিচের লাইনগুলো নিজের মান দিয়ে ভরুন। **এই ফাইল কখনো GitHub এ তুলবেন না।**

```env
BETTER_AUTH_SECRET=অন্তত-৩২-অক্ষরের-random-string
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/bazardor?retryWrites=true&w=majority
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Secret বানাতে: `openssl rand -base64 32`

Google ও GitHub এর key না দিলেও অ্যাপ চলবে; তখন শুধু Email/Password login কাজ করবে।

### ৩. OAuth callback URL

| Provider | Callback URL (local) |
|---|---|
| GitHub | `http://localhost:3000/api/auth/callback/github` |
| Google | `http://localhost:3000/api/auth/callback/google` |

Deploy করার পর `localhost:3000` এর জায়গায় live ঠিকানা দিয়ে আলাদা OAuth app বা অতিরিক্ত callback যোগ করতে হবে, আর `BETTER_AUTH_URL` ও live ঠিকানা করতে হবে।

### ৪. চালান

```bash
npm run dev
```

ব্রাউজারে [http://localhost:3000](http://localhost:3000) খুলুন।

Production build পরীক্ষা করতে:

```bash
npm run build
npm start
```

---

## 🌐 ডেটা (API)

পণ্য ও category র তথ্য আসে Programming Hero এর Bazardor API থেকে। প্রথম URL ব্যর্থ হলে পরেরগুলো ক্রমে চেষ্টা হয়।

| ক্রম | Base URL |
|---|---|
| ১ (মূল) | `https://openapi.programming-hero.com/api/bazardor` |
| ২ | `https://api.api-store.workers.dev/api/bazardor` |
| ৩ | `https://api.abcz.workers.dev/api/bazardor` |

| Endpoint | কাজ |
|---|---|
| `/products` | সব পণ্য |
| `/products/1` | একটি পণ্য |
| `/categories` | সব category |
| `/categories/chal` | একটি category |

---

## 📁 প্রজেক্টের কাঠামো

```text
src/
├── app/
│   ├── api/auth/[...all]/route.js   # Better Auth handler
│   ├── category/[slug]/             # Category পাতা + loading skeleton
│   ├── product/[slug]/              # সুরক্ষিত পণ্য-বিবরণ
│   ├── profile/                     # প্রোফাইল ও update route
│   ├── signin/  signup/             # Auth পাতা
│   ├── layout.js  page.js  globals.css
│   ├── not-found.js  error.js
├── components/                      # Navbar, Ticker, Hero, ProductCard, ...
└── lib/
    ├── api.js                       # API client (fallback সহ)
    ├── auth.js  auth-client.js      # Better Auth config
    ├── auth-errors.js               # বাংলা error বার্তা
    ├── bn.js                        # বাংলা সংখ্যা, দাম, তারিখ
    ├── sort.js  stats.js            # sort ও দামের হিসাব
    └── mongodb.js                   # MongoDB সংযোগ
```

---

## 🎨 ডিজাইন

UI টি Figma ডিজাইন অনুসরণ করে বানানো। থিমের মূল রং: primary `#05893e`, background `#f0f5f0`, text `#1d271f`।

---

