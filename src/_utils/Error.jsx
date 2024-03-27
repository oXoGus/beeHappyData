import React from "react";  

import '../styles/style.css';
import '../styles/404.css';

function Error() {
    return (
        <div>
            <head className="navbar">
        <div className="navbar">
            <div className="pages">
                <img src="src\ressources\logo.png" alt="logo" className="logo"/>
                <a href="index.html" className="pages_name">Acceuil</a>
            </div>
        </div>
    </head>
    <section className="error">
        <img src="src\ressources\404.png" alt="" className="image"/>
        <h1 className="message">Page Introuvable</h1>
        <h3 className="description">Oops! On dirais que vous essayer d’accéder a un lien inexistant !</h3>
        <a href="/"><button>Retour a l'acceuil</button></a>
    </section>
        </div>
    );
};

export default Error;