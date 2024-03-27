import React from 'react';

import '../styles/style.css';

function Home() {
    return (
        <div>
            <head className="navbar">
                <div className="navbar">
                <div className="pages">
                    <img src="src\ressources\logo.png" alt="logo" className="logo"/>
                    <a href="/" className="pages_name">Acceuil</a>
                </div>
                <div className="login">
                    <img src="src\ressources\login.png" alt="" className="login_icon"/>
                    <a href="/Login" className="login_button">Accédez a toutes les données de la ruche</a>
                </div>
                </div>
            </head>
            <section className="Title">
                <h1 className="title_text">BeeHappy</h1>
                <img src="src\ressources\Bee.png" alt="" className="bee"/>
            </section>
        </div>
    )
}

export default Home;