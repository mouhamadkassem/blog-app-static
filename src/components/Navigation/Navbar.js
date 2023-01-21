import React from "react";
import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";
import { useSelector } from "react-redux";
// import AccountVerificationAlertWarning from "./AccoutVerify/AccountVerificationAlertWarning";
// import AccountVerificationSuccessAlert from "./AccoutVerify/AccountVerificationSuccessAlert";

const Navbar = () => {
  // get the user from store

  const user = useSelector((state) => state?.users);
  const isLogin = user?.userAuth;
  const { isAdmin } = isLogin || false;

  // const { token } = useSelector((state) => state?.accVerifyToken);

  return (
    <>
      {!isLogin ? (
        <PublicNavbar />
      ) : isLogin && isAdmin ? (
        <AdminNavbar />
      ) : (
        <PrivateNavbar />
      )}
      {/* {!isVerified ? <AccountVerificationAlertWarning /> : null}
      {token ? <AccountVerificationSuccessAlert /> : null} */}
    </>
  );
};

export default Navbar;
