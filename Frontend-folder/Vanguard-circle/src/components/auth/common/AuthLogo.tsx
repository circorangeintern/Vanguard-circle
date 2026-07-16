import { Link } from "react-router-dom";

import logo from "../../../images/logo.png";

const AuthLogo = () => {
  return (
    <Link to="/" className="mb-10 flex justify-center">
      <img src={logo} alt="StudyCircle" className="h-16 w-auto" />
    </Link>
  );
};

export default AuthLogo;
