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
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        isScrolled
          ? "border-b border-[var(--color-border)] shadow-sm"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 lg:px-6 xl:px-0">
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
