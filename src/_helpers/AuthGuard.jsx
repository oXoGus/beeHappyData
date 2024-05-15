import React from "react";
import { Navigate } from "react-router-dom";
import { accountService } from "../_services/account.service";

function AuthGuard({ children }) {
    
    // on verifit si on a bien été connecté
    if(!accountService.isLogged()) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}

export default AuthGuard;