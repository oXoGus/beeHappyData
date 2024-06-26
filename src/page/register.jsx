import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, redirect } from "react-router-dom";

import '../styles/style.css';
import '../styles/login.css';
import Navbar from '../component/navbar';
import Button from '../component/button';

function Register() {
    // variables completement syncro avec le code html
    //const [email, setEmail] = useState("");

    const  [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const [redirect, setRedirect] = useState(false);
    
    // on met a jour les valeurs 
    const onChange = (e) => {
        setCredentials({
            ...credentials, 
            [e.target.name]: e.target.value})
    }
    ;
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(credentials.email, credentials.password);
        axios.put(`${window.location.origin}/api/register`, credentials)
        .then((res) => {
            console.log(res);
            alert("compte crée !");  
            setRedirect(true);
            
        })
        .catch((err) => {
            console.log(err)
            if (err['response']['status'] == 401) {
                alert("utilisateur déja pris !")
            }
            else if (err['response']['status'] == 400){
                alert("email ou mdp manquant !")
            }
            else {
                alert("Erreur, veuillez réessayer")
            }
        })
    }

    //redirection
    if (redirect){
        return <Navigate to="/login" />;
    }

    return (
    <div>
       <Navbar/>
    <form className="login_page" onSubmit={onSubmit} noValidate>
        <h1 className="login_title">Inscription</h1>
        <div className="form-group">
            <input className="form-field" type="email" name='email' placeholder="Email" value={credentials.email} onChange={onChange}/>
        </div>
        <div className="form-group">
            <input className="form-field" name='password' type="password" placeholder="Mot de Passe" value={credentials.password} onChange={onChange}/>
        </div>
        <Button role="button">Inscription</Button>
    </form>
    </div>
  );
}

export default Register;