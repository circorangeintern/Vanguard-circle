import { NavLink, Link } from "react-router-dom";
import { navLinks } from "./navLinks";

const DesktopNav = () => {
  return (
    <div className="hidden lg:flex items-center justify-between flex-1">
      {/* Navigation Links */}
      <nav className="mx-auto">
        <ul className="flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `font-body text-[15px] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* CTA Buttons */}
      <div className="flex items-center gap-3">
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
    </div>
  );
};

export default DesktopNav;
