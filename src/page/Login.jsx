import React, { useState } from 'react';
import axios from 'axios';

import '../styles/style.css';
import '../styles/login.css';

function Login() {
    // variablescompletement syncro avec le code html
    const [email, setEmail] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        axios.post("https://humble-mantis-evident.ngrok-free.app/api/post/emailVerify")
    }

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
                <a href="/" className="login_button">Retour</a>
            </div>
        </div>
    </head>
    <form className="login_page" onSubmit={onSubmit} noValidate>
        <h1 className="login_title">Accédez à toutes les données de la ruche</h1>
        <div className="form-group">
            <input className="form-field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <span>@lyceemlk.org</span>
        </div>
        <button>Verifier votre adresse email, {email}</button>
    </form>
    </div>
  );
}

export default Login;