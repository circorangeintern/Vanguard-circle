import { useState } from "react";
import { FiChevronDown, FiCalendar } from "react-icons/fi";
import { RiCheckLine, RiLock2Line, RiShieldCheckLine } from "react-icons/ri";

interface PrivacySection {
  id: number;
  title: string;
  text?: string;
  items?: string[];
}

const sections: PrivacySection[] = [
  {
    id: 1,
    title: "Introduction",
    text: "StudyCircle respects your privacy and is committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and the choices you have regarding your information when using the StudyCircle platform.",
  },
  {
    id: 2,
    title: "Data We Collect",
    items: [
      "Account information: name, email address, password (stored securely, hashed).",
      "Group activity: group membership, roles, assignments, tasks, and check-in history.",
      "Usage data: app interactions, feature usage, and event data collected via our analytics tool.",
      "Notification data: device push tokens used to deliver reminders.",
    ],
  },
  {
    id: 3,
    title: "How We Use Your Data",
    items: [
      "To operate core features: reminders, check-ins, streaks, and group coordination.",
      "To measure and improve the product through aggregated, anonymized usage analytics.",
      "To send you notifications you have opted into (push).",
      "We do not sell your personal data to third parties.",
    ],
  },
  {
    id: 4,
    title: "Third-Party Services We Use",
    items: [
      "Firebase Auth / Auth0 — for authentication and session management.",
      "Firebase Cloud Messaging / OneSignal — for web push notifications.",
      "Mixpanel / Amplitude — for anonymized product usage analytics.",
    ],
    text: "Each of these providers has its own privacy practices; using StudyCircle means data may be processed by them as described above.",
  },
  {
    id: 5,
    title: "Your Rights",
    items: [
      "You may request access to, correction of, or deletion of your personal data at any time.",
      "You may leave a group or delete your account, which removes your personal profile data from active use.",
      "You may opt out of push notifications independently of using the app's other features.",
    ],
  },
  {
    id: 6,
    title: "Data Retention & Security",
    text: "We retain account and group data for as long as your account is active. Passwords are hashed and never stored in plain text. Reasonable technical safeguards are used to protect your data, but no system can be guaranteed 100% secure.",
  },
];
const PrivacyPolicy = () => {
  const [openId, setOpenId] = useState<number | null>(1);
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <main className="relative overflow-hidden bg-[#f8fafc] py-28 md:py-32 lg:py-40">
      {/* Blue Blur */}
      <div className="absolute top-10 left-0 h-[280px] w-[280px] rounded-full bg-[#1E3A8A] opacity-10 blur-[120px] md:h-[420px] md:w-[420px]" />

      {/* Teal Blur */}
      <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-[#0D9488] opacity-10 blur-[120px] md:h-[400px] md:w-[400px]" />

      {/* Center Glow */}
      <div className="absolute top-1/2 left-1/2 h-[250px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#0D9488] opacity-[0.05] blur-[160px] md:h-[350px] md:w-[700px]" />

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
                  Your privacy matters
                </h4>

                <p className="mt-3 text-[14px] leading-7 text-gray-600">
                  StudyCircle is committed to protecting your personal
                  information and being transparent about how it is collected
                  and used.
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
                    Privacy First
                  </div>

                  <h1 className="mt-6 text-[34px] font-semibold leading-tight text-[#0f172a] md:text-[48px] lg:text-[64px]">
                    Privacy Policy
                  </h1>

                  <p className="mt-6 max-w-2xl text-[16px] font-light leading-8 text-muted-foreground md:text-[18px]">
                    Learn how StudyCircle collects, uses, and protects your
                    personal information while you use our platform.
                  </p>

                  <div className="mt-6 flex items-center gap-3 text-gray-600">
                    <FiCalendar />
                    <p className="text-[15px]">Last updated: July 2026</p>
                  </div>
                </div>

                {/* Visual */}
                <div className="relative mx-auto h-[260px] w-full max-w-[320px]">
                  <div className="absolute right-0 top-10 h-[130px] w-[230px] rounded-2xl border border-gray-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]" />

                  <div className="absolute right-8 top-16 h-3 w-24 rounded-full bg-gray-100" />
                  <div className="absolute right-8 top-24 h-3 w-36 rounded-full bg-gray-100" />
                  <div className="absolute right-8 top-32 h-3 w-28 rounded-full bg-gray-100" />

                  <div className="absolute left-6 top-0 flex h-32 w-28 items-center justify-center rounded-[28px] bg-[var(--color-primary)] shadow-xl">
                    <RiLock2Line className="text-5xl text-white" />
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

            {/* Policy Sections */}
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
                          <div className="mt-3 max-w-3xl space-y-4">
                            {section.text && (
                              <p className="text-[15px] leading-8 text-gray-600 md:text-[16px]">
                                {section.text}
                              </p>
                            )}

                            {section.items && (
                              <ul className="space-y-3 pl-5 text-[15px] leading-8 text-gray-600 md:text-[16px]">
                                {section.items.map((item, index) => (
                                  <li key={index} className="list-disc">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
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

export default PrivacyPolicy;
