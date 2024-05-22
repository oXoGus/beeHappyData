import React from "react";
import Navbar from "../component/navbar";
import { accountService } from "../_services/account.service";
import { Navigate } from "react-router-dom";


function Disconnect () {
    try {
        accountService.logout()
    }catch{
        // si l'utilisateur n'est pas conecté ne rien faire
    }

    return (
        <Navigate to='/'/>
    )
    
}

export default Disconnect