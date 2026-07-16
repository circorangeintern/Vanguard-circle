import { Link } from "react-router-dom";

import AuthLayout from "../../components/auth/layout/AuthLayout";
import AuthImage from "../../components/auth/layout/AuthImage";
import AuthHeader from "../../components/auth/common/AuthHeader";
import ForgotPasswordForm from "../../components/auth/forms/ForgotPasswordForm";

import forgotPasswordImage from "../../images/auth/ForgotPassword.webp";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout
      image={<AuthImage src={forgotPasswordImage} alt="Forgot Password" />}
    >
      <Link to="/" className="mb-6 flex justify-center">
        <img
          src="/favicon.png"
          alt="StudyCircle"
          className=" w-20 transition-transform duration-300 hover:scale-105"
        />
      </Link>

      <AuthHeader
        title="Forgot Password?"
        subtitle="Enter your school email and we'll send you a verification code."
      />

      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
