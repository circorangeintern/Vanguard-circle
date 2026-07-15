import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
      aria-label="StudyCircle Home"
    >
      <img
        src="/logo.png"
        alt="StudyCircle Logo"
        className="h-[60px] w-auto object-contain"
      />
    </Link>
  );
};

export default NavLogo;
