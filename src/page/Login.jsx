import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { accountService } from '../_services/account.service';

import '../styles/style.css';
import '../styles/login.css';
import Navbar from '../component/navbar';

function Login() {
    // variables completement syncro avec le code html
    //const [email, setEmail] = useState("");

    const  [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const [errorPasswordWrong, setErrorPasswordWrong] = useState(false)

    const [errorEmailWrong, setErrorEmailWrong] = useState(false)

    const [errorPasswordEmpty, setErrorPasswordEmpty] = useState(false)

    const [errorEmailEmpty, setErrorEmailEmpty] = useState(false)

    const [redirect, setRedirect] = useState(false);

    // on met a jour les valeurs 
    const onChange = (e) => {
        setCredentials({
            ...credentials, 
            [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(credentials.email, credentials.password);
        axios.post(`${window.location.origin}/api/login`, credentials)
        .then((res) => {
            console.log(res);

            // on enrengistre le token et l'userName dans le stockage local du navigateur pour les réutiliser après
            accountService.saveToken(res.data.accessToken)
            accountService.saveUserName(credentials.email)
            
            // on redirige l'utilisateur vers la panel utilisateur
            setRedirect(true);
        })
        .catch((err) => {
            console.log(err);
            if (err['response']['status'] == 400){
                // mdp et email vide
                setErrorEmailEmpty(true);
                setErrorEmailWrong(false);
                setErrorPasswordEmpty(true);
                setErrorPasswordWrong(false);
            }else if (err['response']['status'] == 401){
                // email vide 
                setErrorEmailEmpty(true);
                setErrorEmailWrong(false);
                setErrorPasswordEmpty(false);
                setErrorPasswordWrong(false);
            }else if (err['response']['status'] == 402){
                // mdp vide
                setErrorEmailEmpty(false);
                setErrorEmailWrong(false);
                setErrorPasswordEmpty(true);
                setErrorPasswordWrong(false);
            }else if (err['response']['status'] == 403){
                // mauvaise email ou utilisateur inéxistant dans la db
                setErrorEmailWrong(true);
                setErrorPasswordWrong(false);
                setErrorPasswordEmpty(false);
                setErrorEmailEmpty(false);
            }else if (err['response']['status'] == 405){
                // mauvais mdp 
                setErrorEmailWrong(false);
                setErrorPasswordWrong(true);
                setErrorPasswordEmpty(false);
                setErrorEmailEmpty(false);
            }

        })
    }

    //redirection
    if (redirect){
        return <Navigate to="/data" />;
    }

    return (
    <div>
       <Navbar/>
    <form className="login_page" onSubmit={onSubmit} noValidate>
        <h1 className="login_title">Connexion</h1>
        <div className="form-group">
            <input className="form-field" type="email" name='email' placeholder="Email" value={credentials.email} onChange={onChange}/>
        </div>
        {errorEmailEmpty && <p className="error-message">entrez votre nom d'utilisateur !</p>}
        <div className="form-group">
            <input className="form-field" name='password' type="password"  placeholder="Mot de Passe" value={credentials.password} onChange={onChange}/>
        </div>
        {errorPasswordEmpty && <p className="error-message">entrez un mot de passe !</p>}
        <button>connection</button>
        {errorEmailWrong && (
            <div className='error-container'>
                <p className="error-message">Mauvaise email ou </p>
                <a href="/register" className='link'>créez un compte</a>
        </div>
        )}
        {errorPasswordWrong && <p className="error-message">mot de passe incorrect !</p>}
    </form>
    </div>
  );
}

export default Login;