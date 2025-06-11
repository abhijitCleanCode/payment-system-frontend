// not yet ready
import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

import {
  logout,
  selectCurrentUser,
  selectCurrentToken,
} from "@/services/state/authSlice";
import Layout from "./Layout";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"; // Shadcn Button component

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);

  const location = useLocation();
  const dispatch = useDispatch();

  const [showSessionExpiredDialog, setShowSessionExpiredDialog] =
    useState(false);
  const [showSomethingWrongDialog, setShowSomethingWrongDialog] =
    useState(false);

  const handleLogout = () => {
    setShowSessionExpiredDialog(false);
    setShowSomethingWrongDialog(false);
    dispatch(logout());
  };

  const isTokenExpired = function (token) {
    if (!token) {
      // token is not present, considered expired
      return true;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (!decodedToken.exp) {
        // exp time in not present, considering token is either expired or invalid
        return true;
      }

      const expirationTime = decodedToken.exp * 1000;

      const currentTime = new Date().getTime();

      return expirationTime < currentTime;
    } catch (error) {
      console.log(
        "src :: components :: RequireAuth :: RequireAuth :: isTokenExpired :: error: ",
        error
      );
      return true;
    }
  };

  useEffect(() => {
    const expired = isTokenExpired(token);

    if (expired) {
    }
  }, []);

  return token ? (
    <>
      <Layout>
        <Outlet />
      </Layout>

      {/* Session Expired AlertDialog */}
      <AlertDialog
        open={showSessionExpiredDialog}
        onOpenChange={setShowSessionExpiredDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader className="flex flex-col items-center text-red-500 animate-pulse text-center">
            <FaRegClock className="w-8 h-8 mb-2" />
            <AlertDialogTitle className="text-xl font-bold">
              Session Expired!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center font-medium">
              Your session has expired. You will be redirected to the Login
              page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center">
            <AlertDialogAction asChild>
              <Button
                className="px-8 font-bold py-2 rounded transition-all duration-300"
                onClick={handleLogout}
              >
                OK
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Something Wrong AlertDialog (only shows if token is valid but user is null) */}
      <AlertDialog
        open={showSomethingWrongDialog}
        onOpenChange={setShowSomethingWrongDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader className="flex flex-col items-center text-red-500 animate-pulse text-center">
            <IoIosWarning className="w-8 h-8 mb-2" />
            <AlertDialogTitle className="text-xl font-bold">
              Something Wrong!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center font-medium">
              Oops Sorry! There was an issue with your user data. You will be
              redirected to the Login page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center">
            <AlertDialogAction asChild>
              <Button
                className="px-8 font-bold py-2 rounded transition-all duration-300"
                onClick={handleLogout}
              >
                OK
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
