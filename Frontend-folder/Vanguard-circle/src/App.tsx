import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./components/navigation/Navbar";
import Footer from "./components/footer/Footer";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import VerifyOtpPage from "./pages/auth/VerifyOtpPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import ScrollToTop from "./components/common/ScrollToTop";
import InvitePage from "./pages/InvitePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  const { pathname } = useLocation();

  const hideLayout =
    [
      "/login",
      "/signup",
      "/forgot-password",
      "/verify-email",
      "/reset-password",
    ].includes(pathname) ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/invite/");

  return (
    <>
      <ScrollToTop />
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Invite */}
        <Route path="/invite/:inviteCode" element={<InvitePage />} />

        {/* Dashboard — gated: no session redirects to /login?redirect=/dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

        {/* Catch-all — must stay last so it doesn't shadow real routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster position="top-right" richColors closeButton duration={3000} />

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
