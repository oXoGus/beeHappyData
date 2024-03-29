import React from "react";
import Login from "./page/Login.jsx";
import Home from "./page/Home.jsx";
import Error from "./_utils/Error.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthGuard from "./_helpers/AuthGuard.jsx";
import Panel from "./page/Panel.jsx";
import AdminPanel from "./page/AdminPanel.jsx";
import Register from "./page/register.jsx";


function App() {
    return (
    <>
        <BrowserRouter>
            <Routes>
                {/* on attribut un component par lien */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/data" element={<Panel />} />
                <Route path="/admin" element={
                    // on autorise uniquement l'utilisateur connecté
                    <AuthGuard> 
                        <AdminPanel />    
                    </AuthGuard>
                } />
                
                {/* si l'url ne correspond a aucun lien on affiche la page 404 */}
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    </>        
    )
}

export default App;