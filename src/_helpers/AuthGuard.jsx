import React from "react";
import { Navigate } from "react-router-dom";

function AuthGuard({ children }) {
    var logged = false;

    if(!logged) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}

export default AuthGuard;