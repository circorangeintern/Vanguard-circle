import type { ReactNode } from "react";

interface AuthContentProps {
  children: ReactNode;
}

const AuthContent = ({ children }: AuthContentProps) => {
  return (
    <div
      className="
        flex
        flex-col
      "
    >
      {children}
    </div>
  );
};

export default AuthContent;
