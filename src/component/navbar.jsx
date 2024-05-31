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
                    <a href="/">
                        <img src="src\ressources\logo.png" href="/" alt="logo" className="logo"/>
                    </a>
                    <a href="/data" className="pages_name">Accédez à toutes les données de la ruche</a>
                </div>
                <div className="login">
                    <img src="src\ressources\profile_icon.png" alt="" className="icon" />
                    <a href="/settings" className="pages_name">Profile de {userName} </a>
                    <h6 className="slash">|</h6>
                    <a href="/disconnect" className="login_button">Deconnexion</a>
                </div>
            </div>
    
        </>)
    } else {
        return (
            <>
            <div className="navbar">
                <div className="pages">
                    <a href="/">
                        <img src="src\ressources\logo.png" href="/" alt="logo" className="logo"/>
                    </a>
                    <a href="/data" className="pages_name">Accédez aux Données</a>
                </div>
                <div className="login">
                    <a href="/login" className="login_button">Connexion</a>
                    <h6 className="slash">|</h6>
                    <a href="/register" className="login_button">Inscription</a>
                </div>
            </div>
        </>
    );}
};

export default Navbar;