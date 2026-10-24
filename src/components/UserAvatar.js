export default function UserAvatar({ user, className = "" }) {
  const initial = (user?.name || "?").trim().charAt(0).toUpperCase();

  if (user?.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.image}
        alt=""
        referrerPolicy="no-referrer"
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <span
      className={`flex items-center justify-center bg-primary font-bold text-primary-content ${className}`}
    >
      {initial}
    </span>
  );
}