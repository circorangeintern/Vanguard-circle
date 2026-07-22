import { useState } from "react";
import { FiCalendar, FiChevronDown } from "react-icons/fi";
import { RiCheckLine, RiFileTextLine, RiShieldCheckLine } from "react-icons/ri";

interface TermsSection {
  id: number;
  title: string;
  text: string;
}

const sections: TermsSection[] = [
  {
    id: 1,
    title: "Acceptance of Terms",
    text: "By creating an account and using StudyCircle, you agree to these Terms and the Privacy Policy above.",
  },
  {
    id: 2,
    title: "Acceptable Use",
    text: "StudyCircle is intended for coordinating study groups among students. You agree not to use the platform for harassment, spam, or any unlawful activity, and to keep your login credentials confidential.",
  },
  {
    id: 3,
    title: "Group Content & Conduct",
    text: "You are responsible for the content you post in tasks, assignments, and check-ins. Group organizers may remove members who violate acceptable use. We reserve the right to remove content or suspend accounts that violate these terms.",
  },
  {
    id: 4,
    title: "Service Availability",
    text: "StudyCircle is provided as an MVP / early-stage product built during an internship program. Features, availability, and performance are not guaranteed, and the service may change or be discontinued without notice.",
  },
  {
    id: 5,
    title: "Liability Disclaimer",
    text: 'StudyCircle is provided "as is" without warranties of any kind. We are not liable for missed assignments, deadlines, or academic outcomes resulting from use — or inability to use — the app, including notification delivery failures by third-party providers (e.g., push services).',
  },
  {
    id: 6,
    title: "Changes to These Terms",
    text: "We may update these Terms and the Privacy Policy as the product evolves. Continued use of the app after changes constitutes acceptance of the updated terms.",
  },
];

const TermsAndConditions = () => {
  const [openId, setOpenId] = useState<number | null>(1);
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <main className="relative overflow-hidden bg-[#f8fafc] py-28 md:py-32 lg:py-40">
      {/* Blue Blur */}
      <div className="absolute top-10 left-0 h-[280px] w-[280px] rounded-full bg-[#1E3A8A] opacity-10 blur-[120px] md:h-[420px] md:w-[420px]" />

      {/* Teal Blur */}
      <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-[#0D9488] opacity-10 blur-[120px] md:h-[400px] md:w-[400px]" />

      {/* Center Glow */}
      <div className="absolute left-1/2 top-1/2 h-[250px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#0D9488] opacity-[0.05] blur-[160px] md:h-[350px] md:w-[700px]" />

      <div className="relative z-10 mx-auto max-w-[85rem] px-4 md:px-6 lg:px-6 xl:px-10">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-3xl border border-gray-200 bg-white p-5">
              <h3 className="text-[18px] font-semibold text-[#0f172a]">
                On this page
              </h3>

              <div className="mt-6 space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setOpenId(section.id)}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-[15px] transition ${
                      openId === section.id
                        ? "bg-blue-50 font-semibold text-[var(--color-primary)]"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {section.id}.&nbsp;&nbsp;{section.title}
                  </button>
                ))}
              </div>

              <div className="mt-10 rounded-3xl bg-blue-50 p-5">
                <RiShieldCheckLine className="text-2xl text-[var(--color-primary)]" />

                <h4 className="mt-4 text-[16px] font-semibold text-[var(--color-primary)]">
                  Important
                </h4>

                <p className="mt-3 text-[14px] leading-7 text-gray-600">
                  By using StudyCircle, you agree to these Terms & Conditions.
                  Please read them carefully before using the platform.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
            {/* Hero */}
            <div className="relative overflow-hidden border-b border-gray-200 px-6 py-10 md:px-10 lg:px-12 lg:py-16">
              {/* Hero Glow */}
              <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-[#0D9488] opacity-15 blur-[110px] md:h-[420px] md:w-[420px]" />

              {/* Dot Pattern */}
              <div className="absolute right-14 top-12 hidden grid-cols-6 gap-2 opacity-20 md:grid">
                {Array.from({ length: 36 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]"
                  />
                ))}
              </div>

              <div className="relative z-10 grid items-center gap-10 md:grid-cols-[1fr_320px]">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
                    <RiShieldCheckLine />
                    Legal Agreement
                  </div>

                  <h1 className="mt-6 text-[34px] font-semibold leading-tight text-[#0f172a] md:text-[48px] lg:text-[64px]">
                    Terms & Conditions
                  </h1>

                  <p className="mt-6 max-w-2xl text-[16px] font-light leading-8 text-muted-foreground md:text-[18px]">
                    These Terms & Conditions govern your use of StudyCircle. By
                    creating an account or using the platform, you agree to
                    comply with these terms.
                  </p>

                  <div className="mt-6 flex items-center gap-3 text-gray-600">
                    <FiCalendar />
                    <p className="text-[15px]">Last updated: July 2026</p>
                  </div>
                </div>

                {/* Visual */}
                <div className="relative mx-auto h-[260px] w-full max-w-[320px]">
                  <div className="absolute right-0 top-10 h-[130px] w-[230px] rounded-2xl border border-gray-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]" />

                  <div className="absolute right-8 top-16 h-3 w-28 rounded-full bg-gray-100" />
                  <div className="absolute right-8 top-24 h-3 w-40 rounded-full bg-gray-100" />
                  <div className="absolute right-8 top-32 h-3 w-24 rounded-full bg-gray-100" />

                  <div className="absolute left-6 top-0 flex h-32 w-28 items-center justify-center rounded-[28px] bg-[var(--color-primary)] shadow-xl">
                    <RiFileTextLine className="text-5xl text-white" />
                  </div>

                  <div className="absolute bottom-8 right-0 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400 shadow-lg">
                    <RiCheckLine className="text-4xl text-white" />
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile Page Nav */}
            <div className="border-b border-gray-200 lg:hidden">
              <button
                onClick={() => setShowMobileNav((prev) => !prev)}
                className="flex w-full items-center justify-between bg-white px-5 py-4"
              >
                <span className="font-semibold text-[#0f172a]">
                  On this page
                </span>

                <FiChevronDown
                  className={`text-[var(--color-primary)] transition ${
                    showMobileNav ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showMobileNav && (
                <div className="space-y-2 px-4 pb-4">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setOpenId(section.id);
                        setShowMobileNav(false);
                      }}
                      className={`w-full rounded-2xl px-4 py-3 text-left text-[15px] transition ${
                        openId === section.id
                          ? "bg-blue-50 font-semibold text-[var(--color-primary)]"
                          : "bg-white text-gray-600"
                      }`}
                    >
                      {section.id}.&nbsp;&nbsp;{section.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Terms Sections */}
            <div className="px-5 py-4 md:px-8 lg:px-10">
              {sections.map((section) => {
                const isOpen = openId === section.id;

                return (
                  <div
                    key={section.id}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <button
                      onClick={() =>
                        setOpenId((prev) =>
                          prev === section.id ? null : section.id,
                        )
                      }
                      className="flex w-full items-start gap-4 py-6 text-left md:gap-6 md:py-8"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-semibold text-[var(--color-primary)]">
                        {section.id}
                      </span>

                      <span className="flex-1">
                        <h3 className="text-[18px] font-semibold text-[#0f172a] md:text-[22px]">
                          {section.title}
                        </h3>

                        {isOpen && (
                          <p className="mt-3 max-w-3xl text-[15px] leading-8 text-gray-600 md:text-[16px]">
                            {section.text}
                          </p>
                        )}
                      </span>

                      <FiChevronDown
                        className={`mt-3 text-[var(--color-primary)] transition ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermsAndConditions;
