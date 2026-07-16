import { Link } from "react-router-dom";

import AuthLayout from "../../components/auth/layout/AuthLayout";
import AuthImage from "../../components/auth/layout/AuthImage";
import AuthHeader from "../../components/auth/common/AuthHeader";
import VerifyOtpForm from "../../components/auth/forms/VerifyOtpForm";

import verifyOtpImage from "../../images/auth/verify.webp";

const VerifyOtpPage = () => {
  return (
    <AuthLayout image={<AuthImage src={verifyOtpImage} alt="Verify Email" />}>
      <Link
        to="/"
        className="mb-6 flex justify-center transition-transform duration-300 hover:scale-105"
      >
        <img src="/favicon.png" alt="StudyCircle" className="w-20" />
      </Link>

      <AuthHeader
        title="Verify Your Email"
        subtitle="A 6-digit verification code has been sent to your email."
      />

      <VerifyOtpForm />
    </AuthLayout>
  );
};

export default VerifyOtpPage;
