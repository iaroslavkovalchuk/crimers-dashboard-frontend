import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export const PrivateRouter = ({children}) => {
    const auth = useSelector((state) => state.auth);
    console.log("auth: ", auth.user)
    return auth.isAuthorized ? <>{children}</> : <Navigate to="/signin" />;
}

export const AdminRouter = ({children}) => {
    const auth = useSelector((state) => state.auth);
    const admin_email_1 = "goldrace1123@gmail.com";
    const admin_email_2 = "octothorpe_99@yahoo.com"
    console.log(auth.user.email);
    return (auth.user.email == admin_email_1 || auth.user.email == admin_email_2) ? <>{children}</> : <Navigate to="/dashboard" />;
}