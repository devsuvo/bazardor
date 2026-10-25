const MESSAGES = [
  ["INVALID_EMAIL_OR_PASSWORD", "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে"],
  ["USER_ALREADY_EXISTS", "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে"],
  ["PASSWORD_TOO_SHORT", "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"],
  ["INVALID_EMAIL", "ইমেইলটি সঠিক নয়"],
];

export function authErrorMessage(error, fallback) {
  const code = String(error?.code ?? "");
  const hit = MESSAGES.find(([key]) => code.includes(key));
  if (hit) return hit[1];

  const status = Number(error?.status);
  if (status === 401) return "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে";
  if (status === 403)
    return "এই ঠিকানা থেকে অনুমতি নেই। ঠিকানা বারে localhost:3000 ব্যবহার করুন";
  if (status === 429)
    return "অনেকবার চেষ্টা করা হয়েছে, একটু পরে আবার চেষ্টা করুন";
  if (status >= 500)
    return "সার্ভারে সমস্যা হয়েছে, terminal এর লাল লেখাটি দেখুন";

  return fallback;
}