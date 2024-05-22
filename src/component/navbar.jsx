import React from "react";  
import axios from 'axios';
import { accountService } from "../_services/account.service";


import '../styles/style.css';

function Navbar() {



    if (accountService.isLogged()){
        
        let userName = accountService.getUserName();
        
        return (
            <>
            <div className="navbar">
                <div className="pages">
                    <img src="src\ressources\logo.png" alt="logo" className="logo"/>
                    <a href="/" className="pages_name">Acceuil</a>
                    <a href="/data" className="pages_name">Accédez à toutes les données de la ruche</a>
                </div>
                <div className="login">
                    <img src="src\ressources\profile_icon.png" alt="" className="icon" />
                    <a href="/admin" className="pages_name">Profile de {userName} </a>
                    <h6 className="slash">|</h6>
                    <a href="/disconnect" className="login_button">se déconnecter</a>
                </div>
            </div>
    
        </>)
    } else {
        return (
            <>
            <div className="navbar">
                <div className="pages">
                    <img src="src\ressources\logo.png" alt="logo" className="logo"/>
                    <a href="/" className="pages_name">Acceuil</a>
                    <a href="/data" className="pages_name">Accédez à toutes les données de la ruche</a>
                </div>
                <div className="login">
                    <img src="src\ressources\login.png" alt="" className="login_icon"/>
                    <a href="/login" className="login_button">se connecter</a>
                    <h6 className="slash">|</h6>
                    <a href="/register" className="login_button">Inscription</a>
                </div>
            </div>
        </>
    );}
};

export default Navbar;