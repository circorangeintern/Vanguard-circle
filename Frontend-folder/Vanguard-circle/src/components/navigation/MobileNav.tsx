import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { navLinks } from "./navLinks";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const scrollToSection = (id: string) => {
    onClose();

    requestAnimationFrame(() => {
      const section = document.getElementById(id);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          transition={{ duration: 0.25 }}
          className="absolute left-0 top-full w-full border-t border-slate-200 bg-white shadow-lg lg:hidden"
        >
          <nav className="container mx-auto flex flex-col px-6 py-8">
            <ul className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.sectionId)}
                    className="
                      font-body
                      text-[20px]
                      font-medium
                      uppercase
                      tracking-wider
                      text-slate-900
                      transition-colors
                      duration-300
                      hover:text-[var(--color-primary)]
                    "
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                to="/login"
                onClick={onClose}
                className="rounded-xl border border-[var(--color-primary)] px-5 py-3 text-center font-body font-medium text-[var(--color-text-primary)] transition-colors duration-200 hover:bg-[var(--color-background)]"
              >
                Log in
              </Link>

              <Link
                to="/signup"
                onClick={onClose}
                className="rounded-xl  bg-[var(--color-primary)] px-5 py-3 text-center font-body font-medium text-white transition-colors duration-200 hover:bg-[var(--color-primary-dark)]"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
