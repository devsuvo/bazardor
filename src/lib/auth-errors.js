const MESSAGES = [
  ["INVALID_EMAIL_OR_PASSWORD", "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে"],
  ["USER_ALREADY_EXISTS", "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে"],
  ["PASSWORD_TOO_SHORT", "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"],
  ["INVALID_EMAIL", "ইমেইলটি সঠিক নয়"],
];

export function authErrorMessage(error, fallback) {
  const code = String(error?.code ?? "");
  const hit = MESSAGES.find(([key]) => code.includes(key));
  return hit ? hit[1] : fallback;
}