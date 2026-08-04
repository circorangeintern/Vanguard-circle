interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

// Deterministic (not random) — the same name always gets the same color, so
// a user's avatar doesn't shift between renders/pages.
const PALETTE = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-indigo-500",
  "bg-teal-500",
];

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return parts
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function colorOf(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

// No account photo storage exists yet, so every user is shown as their
// initials on a deterministic color — never a fake stock photo standing in
// for a real profile picture.
const Avatar = ({ name, size = 40, className = "" }: AvatarProps) => (
  <div
    className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${colorOf(name)} ${className}`}
    style={{ width: size, height: size, fontSize: size * 0.38 }}
  >
    {initialsOf(name)}
  </div>
);

export default Avatar;
