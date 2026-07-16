import { Link } from "react-router-dom";

import AuthLayout from "../../components/auth/layout/AuthLayout";
import AuthImage from "../../components/auth/layout/AuthImage";
import AuthHeader from "../../components/auth/common/AuthHeader";
import SignupForm from "../../components/auth/forms/SignupForm";

import signupImage from "../../images/auth/signup.webp";
import logo from "../../../public/favicon.png";

const SignupPage = () => {
  return (
    <AuthLayout image={<AuthImage src={signupImage} alt="Sign Up" />}>
      <Link to="/" className="mb-6 flex justify-center">
        <img
          src={logo}
          alt="StudyCircle"
          className="w-20 transition-transform duration-300 hover:scale-105"
        />
      </Link>

      <AuthHeader
        title="Welcome to StudyCircle"
        subtitle="Create your account to start collaborating with your classmates."
      />

      <SignupForm />
    </AuthLayout>
  );
};

export default SignupPage;
