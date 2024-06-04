import React, { useState } from "react";
import Navbar from "../component/navbar";
import Button from "../component/button";

import '../styles/style.css';
import '../styles/profileSettings.css';

function ProfileSettings (){
    const [activateNotif, setActivateNotif] = useState(false);
    const [activateAllNotif, setActivateAllNotif] = useState(false);
    const [lowBattery, setLowBattery] = useState(false);
    const [changeWeight, setChangeWeight] = useState(false);
    const [honeyNotif, setHoneyNotif] = useState(false);
    const [honeySliderValue, setHoneySliderValue] = useState(5);
    const [lowBatterySliderValue, setLowBatterySliderValue] = useState(20);

    const handleActivateNotif = () => {
        if (activateNotif == false){
            setActivateNotif(true);
        }
        else {
            setActivateNotif(false);
        }
    };    
    
    const handleActivateAllNotif = () => {
        if (activateAllNotif == false){
            setActivateAllNotif(true);
            setLowBattery(true);
            setChangeWeight(true);
            setHoneyNotif(true);
        }
        else {
            setActivateAllNotif(false);
            setLowBattery(false);
            setChangeWeight(false);
            setHoneyNotif(false);
        }
    };

    const handleLowBattery = () => {
        if (lowBattery == false){
            setLowBattery(true);
        }
        else {
            setLowBattery(false);
        }
    };
    
    const handleChangeWeight = () => {
        if (changeWeight == false){
            setChangeWeight(true);
        }
        else {
            setChangeWeight(false);
        }
    };

    const handleHoneyNotif = () => {
        if (honeyNotif == false){
            setHoneyNotif(true);
        }
        else {
            setHoneyNotif(false);
        }
    };

    const handleHoneySliderValue = (e) => {
        setHoneySliderValue(e.target.value)
    }

    const handlelowBatterySliderValue = (e) => {
        setLowBatterySliderValue(e.target.value)
    }

    return (
        <>
            <Navbar/>
            <section className="settingsContainer">
                <div className="settings">
                    <h2>paramètres du compte </h2>
                    <div className="activateNotif">
                        <h1>activer les notifications </h1>
                        <input checked={activateNotif} onChange={handleActivateNotif} type="checkbox" id="switchActivateNotif" /><label className="switch" for="switchActivateNotif"></label>
                    </div>
                    {
                        activateNotif &&
                        <div className="activateNotif">
                            <h1>activer toutes les notifications</h1>
                            <input checked={activateAllNotif} onChange={handleActivateAllNotif} type="checkbox" id="switchActivateAllNotif" /><label className="switch" for="switchActivateAllNotif"></label>
                        </div>
                    }
                    
                    
                    <div class="separator-container">
                        <div class="line"></div>
                        <div class="text">paramètres avancées</div>
                        <div class="line"></div>
                    </div>
                    {
                        activateNotif && 
                        <div className="activateNotif">
                            <h1>notifications batterie faible</h1>
                            <input checked={lowBattery} onChange={handleLowBattery} type="checkbox" id="switchLowBattery" /><label className="switch" for="switchLowBattery"></label>
                        </div>
                    }
                    {
                        activateNotif && lowBattery &&
                        <div>
                            <p>vous recevrez un message quand la ruche aura {lowBatterySliderValue}% </p>
                            <div className="activateNotif">
                                <div>
                                    <input className="rangeInput" value={lowBatterySliderValue} onChange={handlelowBatterySliderValue} type="range" min="0" max="100" step="1"/>
                                </div>
                                <a className="switch" href="/put/api/value">
                                    <button >sauvegarder</button>
                                </a>
                            </div>
                        </div>
                        
                    }
                    {
                        activateNotif && 
                        <div className="activateNotif">
                            <h1>notifications essaimage ou chute de la ruche</h1>
                            <input checked={changeWeight} onChange={handleChangeWeight} type="checkbox" id="switchChangeWeight" /><label className="switch" for="switchChangeWeight"></label>
                        </div>
                    }
                    {
                        activateNotif && 
                        <div className="activateNotif">
                            <h1>notifications à partir d'un certain seuil de miel dans la ruche</h1>
                            <input checked={honeyNotif} onChange={handleHoneyNotif} type="checkbox" id="switchHoneyNotif" /><label className="switch" for="switchHoneyNotif"></label>
                        </div>
                    }
                    {
                        activateNotif && honeyNotif && 
                        <div>
                            <p>vous recevrez un message quand la ruche aura {honeySliderValue} kg de miel</p>
                            <div className="activateNotif">
                                <div>
                                    <input className="rangeInput" value={honeySliderValue} onChange={handleHoneySliderValue} type="range" min="0" max="10" step="1"/>
                                </div>
                                <a className="switch" href="/put/api/value">
                                    <button >sauvegarder</button>
                                </a>
                            </div>
                        </div>
                    }
                    <div className="activateNotif">
                        <div>
                            <h1>changer de numero de téléphone </h1>
                            <p>numero actuel : ...</p>
                        </div>
                        <a className="switch" href="/changetel">
                            <button >changer</button>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProfileSettings;