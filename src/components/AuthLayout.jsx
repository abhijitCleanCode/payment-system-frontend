// simple mechanism to check if user is authenticated
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authToken = useSelector((state) => state.auth.token);
  const authStatus = authToken != null ? true : false;

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate(`/login`);
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authToken, authentication, navigate]);

  if (loader) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
};

export default AuthLayout;
