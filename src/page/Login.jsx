import React, { useState } from 'react';
import axios from 'axios';

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

            setRedirect(true);
        })
        .catch((err) => {
            console.log(err);
            if (err['response']['status'] == 400){
                // mdp et email vide
                setErrorEmailEmpty(true);
                setErrorPasswordEmpty(true);
            }else if (err['response']['status'] == 401){
                // email vide 
                setErrorEmailEmpty(true);
                setErrorPasswordEmpty(false);
            }else if (err['response']['status'] == 402){
                // mdp vide
                setErrorEmailEmpty(false);
                setErrorPasswordEmpty(true);
            }
        })
    }

    //redirection
    if (redirect){
        return <Navigate to="/admin" />;
    }

    return (
    <div>
       <Navbar/>
    <form className="login_page" onSubmit={onSubmit} noValidate>
        <h1 className="login_title">Accédez à votre compte privé</h1>
        <div className="form-group">
            <input className="form-field" type="email" name='email' placeholder="Email" value={credentials.email} onChange={onChange}/>
            <span>@lyceemlk.org</span>
        </div>
        {errorEmailEmpty && <p className="error-message">entrez une adresse email !</p>}
        <div className="form-group">
            <span>MDP</span>
            <input className="form-field" name='password' type="text" placeholder="Mot de Passe" value={credentials.password} onChange={onChange}/>
        </div>
        <button>connection</button>
    </form>
    </div>
  );
}

export default Login;