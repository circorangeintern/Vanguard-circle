const NavLogo = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      onClick={scrollToTop}
      className="flex items-center gap-2 hover:opacity-80 transition"
      aria-label="StudyCircle Home"
    >
      <img src="/logo.png" alt="StudyCircle Logo" className="h-[60px] w-auto" />
    </button>
  );
};

export default NavLogo;
