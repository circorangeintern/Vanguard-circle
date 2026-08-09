import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "./navLinks";

const DesktopNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    if (location.pathname === "/") {
      const section = document.getElementById(id);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    navigate(`/#${id}`);
  };

  return (
    <>
      {/* Navigation Links */}
      <div className="hidden lg:flex items-center gap-10">
        {navLinks.map((link) => (
          <button
            key={link.sectionId}
            type="button"
            onClick={() => scrollToSection(link.sectionId)}
            className="
              font-body
              text-[14px]
              font-medium
              uppercase
              text-slate-800
              transition-colors
              duration-300
              hover:text-[var(--color-primary)]
              tracking-wider
            "
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="hidden lg:flex items-center gap-3">
        <Link
          to="/login"
          className="rounded-xl border border-[var(--color-primary)] px-6 py-2.5 font-body text-[15px] font-medium text-[var(--color-text-primary)] transition-all duration-200 hover:bg-[var(--color-background)]"
        >
          Log in
        </Link>

        <Link
          to="/signup"
          className="rounded-xl bg-[var(--color-primary)] px-6 py-2.5 font-body text-[15px] font-medium text-white transition-all duration-200 hover:bg-[var(--color-primary-dark)]"
        >
          Get Started
        </Link>
      </div>
    </>
  );
};

export default DesktopNav;
