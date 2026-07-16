import AuthLayout from "../../components/auth/layout/AuthLayout";
import AuthImage from "../../components/auth/layout/AuthImage";
import AuthHeader from "../../components/auth/common/AuthHeader";
import LoginForm from "../../components/auth/forms/LoginForm";

import loginImage from "../../images/auth/login.webp";
import { Link } from "react-router-dom";
import logo from "../../../public/favicon.png";

const LoginPage = () => {
  return (
    <AuthLayout reverse image={<AuthImage src={loginImage} alt="Login" />}>
      <Link to="/" className="mb-5 flex justify-center">
        <img
          src={logo}
          alt="StudyCircle"
          className="w-20  transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <AuthHeader
        title="Welcome to StudyCircle"
        subtitle="Log in to continue your study journey."
      />

      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
