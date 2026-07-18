import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

import NavLogo from "./NavLogo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 pt-1 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200 bg-white/90 shadow-lg backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between px-6 sm:px-8 lg:px-12">
        <NavLogo />

        <DesktopNav />

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-[var(--color-text-primary)] transition-colors duration-200 hover:bg-[var(--color-background)] lg:hidden"
        >
          {isOpen ? (
            <HiOutlineX className="h-8 md:h-10 w-8 md:w-10" />
          ) : (
            <HiOutlineMenuAlt3 className="h-8 md:h-10 w-8 md:w-10" />
          )}
        </button>
      </div>

      <MobileNav isOpen={isOpen} onClose={closeMenu} />
    </header>
  );
};

export default Navbar;
