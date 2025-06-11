import { useEffect, useState } from "react";
import { FormSignIn } from "@/components/login";

import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/services/state/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector(selectCurrentToken);

  const isLoginPage = location.pathname === "/login";
  const hasToken = !!token;

  // verify on initial render
  useEffect(() => {
    if (isLoginPage && hasToken) {
      navigate("/");
    }
  }, [isLoginPage, hasToken]);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto">
        <div className="sub-container max-w-[496px]">
          <FormSignIn />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-200 xl:text-left">
              &#169; 2025 All Rights Reserved
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
