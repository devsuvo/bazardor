export default function UserAvatar({ user, className = "" }) {
  const src = user?.image || "/avatar.jpg";
  const alt = user?.name ? `${user.name} এর ছবি` : "ব্যবহারকারীর ছবি";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      className={`object-cover ${className}`}
    />
  );
}