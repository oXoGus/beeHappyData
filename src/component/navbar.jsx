import React from "react";  

import '../styles/style.css';

function Navbar() {
    return (
        <div>
        <head className="navbar">
        <div className="navbar">
            <div className="pages">
                <img src="src\ressources\logo.png" alt="logo" className="logo"/>
                <a href="/" className="pages_name">Acceuil</a>
                <a href="/data" className="pages_name">Accédez à toutes les données de la ruche</a>
            </div>
            <div className="login">
                <img src="src\ressources\login.png" alt="" className="login_icon"/>
                <a href="/login" className="login_button">admin?</a>
                <h6 className="slash">|</h6>
                <a href="/register" className="login_button">Inscription</a>
            </div>
        </div>
    </head>
    </div>
    );
};

export default Navbar;