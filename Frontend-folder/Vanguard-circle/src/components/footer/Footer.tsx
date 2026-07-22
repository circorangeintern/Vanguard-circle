import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import { motion } from "framer-motion";

import { Container } from "../ui";

import { quickLinks, supportLinks } from "./FooterLinks";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const socials = [
  {
    icon: FaFacebookF,
    href: "#",
  },
  {
    icon: FaXTwitter,
    href: "#",
  },
  {
    icon: FaInstagram,
    href: "#",
  },
  {
    icon: FaLinkedinIn,
    href: "#",
  },
];

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (path.includes("#")) {
      const [route, id] = path.split("#");

      navigate(route);

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      navigate(path);
    }
  };
  return (
    <footer className="border-t border-[var(--color-border)] bg-white">
      <Container className="pt-16 pb-8">
        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}

          <div className="max-w-sm">
            <img
              src="/logo.png"
              alt="StudyCircle"
              className="h-20 w-auto cursor-pointer"
            />

            <p className="mt-6 leading-8 text-[var(--color-text-secondary)]">
              Helping university students stay organized through smarter study
              groups, assignments, tracking and collaborative learning.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="mb-6 font-heading text-xl font-semibold text-[var(--color-text-primary)]">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <button
                    onClick={() => handleNavigation(link.to)}
                    className="transition hover:text-[var(--color-primary)]"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}

          <div>
            <h3 className="mb-6 font-heading text-xl font-semibold text-[var(--color-text-primary)]">
              Support
            </h3>

            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="transition hover:text-[var(--color-primary)]"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}

          <div>
            <h3 className="mb-6 hidden font-heading text-xl font-semibold lg:block">
              Connect
            </h3>

            <div className="flex gap-4 justify-start lg:justify-start">
              {socials.map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  whileHover={{
                    y: -5,
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  href={href}
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--color-border)]
                    bg-[var(--color-background)]
                    text-xl
                    text-[var(--color-primary)]
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-[var(--color-primary)]
                    hover:bg-[var(--color-primary)]
                    hover:text-white
                    hover:shadow-lg
                  "
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-14 border-t border-[var(--color-border)] pt-8 text-center">
          <p className="text-sm text-[var(--color-text-secondary)]">
            © 2026 StudyCircle. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
