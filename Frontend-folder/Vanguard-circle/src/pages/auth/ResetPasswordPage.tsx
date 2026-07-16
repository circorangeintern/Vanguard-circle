import { Link } from "react-router-dom";

import AuthLayout from "../../components/auth/layout/AuthLayout";
import AuthImage from "../../components/auth/layout/AuthImage";
import AuthHeader from "../../components/auth/common/AuthHeader";
import ResetPasswordForm from "../../components/auth/forms/ResetPasswordForm";

import resetPasswordImage from "../../images/auth/CreateNewPassword.webp";

const ResetPasswordPage = () => {
  return (
    <AuthLayout
      reverse
      image={<AuthImage src={resetPasswordImage} alt="Reset Password" />}
    >
      <Link to="/" className="mb-6 flex justify-center">
        <img
          src="/favicon.png"
          alt="StudyCircle"
          className="w-20 transition-transform duration-300 hover:scale-105"
        />
      </Link>

      <AuthHeader
        title="Create New Password"
        subtitle="Choose a new password for your account."
      />

      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
