import React from 'react';

import '../styles/style.css';
import Navbar from '../component/navbar';

function Home() {
    return (
        <div>
           <Navbar/>
            <section className="Title">
                <h1 className="title_text">BeeHappy</h1>
                <img src="src\ressources\Bee.png" alt="" className="bee"/>
            </section>
        </div>
    )
}

export default Home;