import type { ReactNode } from "react";

interface AuthLayoutProps {
  image: ReactNode;
  children: ReactNode;
  reverse?: boolean;
}

const AuthLayout = ({ image, children, reverse = false }: AuthLayoutProps) => {
  return (
    <main
      className={`
        min-h-screen
        xl:h-screen
        xl:grid
        xl:grid-cols-2

        ${reverse ? "xl:[&>*:first-child]:order-2" : ""}
      `}
    >
      {image}

      <section
        className="
          flex
          items-center
          justify-center

          px-6
          py-8

          sm:px-8

          lg:px-12
          lg:py-8

          xl:px-16
          bg-[#f8fafc]
        "
      >
        <div className="w-full max-w-[420px]">{children}</div>
      </section>
    </main>
  );
};

export default AuthLayout;
