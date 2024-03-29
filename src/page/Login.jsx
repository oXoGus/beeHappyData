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


    // on met a jour les valeurs 
    const onChange = (e) => {
        setCredentials({
            ...credentials, 
            [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(credentials.email, credentials.password);
        axios.post("https://humble-mantis-evident.ngrok-free.app/api/post/emailVerify", email)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
    <div>
       <Navbar/>
    <form className="login_page" onSubmit={onSubmit} noValidate>
        <h1 className="login_title">Accédez aà votre compte privé</h1>
        <div className="form-group">
            <input className="form-field" type="email" name='email' placeholder="Email" value={credentials.email} onChange={onChange}/>
            <span>@lyceemlk.org</span>
        </div>
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