import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export const PrivateRouter = ({children}) => {
    const auth = useSelector((state) => state.auth);
    return auth.isAuthorized ? <>{children}</> : <Navigate to="/signin" />;
}
