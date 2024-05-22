import React, { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import axios from "axios";

import '../styles/style.css';
import '../styles/panel.css';
import BatteryChart from "../component/BatteryChart";
import WeightChart from "../component/WeightChart";

function Panel() {
    const [batteryData, setBatteryData] = useState(null);
    const [selectedOptionBattery, setSelectedOptionBattery] = useState('30');

    const [weightData, setWeightData] = useState(null);
    const [selectedOptionWeight, setSelectedOptionWeight] = useState('30');

    const handleOptionChangeBattery = (event) => {
        setSelectedOptionBattery(event.target.value);
    };

    const handleOptionChangeWeight = (event) => {
        setSelectedOptionWeight(event.target.value);
    };

    useEffect(() => {
        axios.get(`${window.location.origin}/api/get/battery/${selectedOptionBattery}`)
            .then(res => {
                // Fonction pour formater les dates en français
                function formatDate(dateString) {
                    const date = new Date(dateString);
                    const datePart = date.toLocaleDateString('fr-FR');
                    const timePart = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                    return `${datePart} à ${timePart}`;
                }
        
                // Extraction des valeurs de battery et des dates formatées
                const formattedData = {
                    labels: res.data.map(message => formatDate(message.messageDateTime)),
                    datasets: [{
                        label: 'pourcentage de batterie',
                        data: res.data.map(message => message.battery),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.5 // Ajuster pour accentuer l'interpolation
                    }]
                };

                setBatteryData(formattedData);
            })
            .catch(err => {
                console.error("Erreur lors du chargement des données de la batterie:", err);
            });
    }, [selectedOptionBattery]); // Ecoute uniquement les changements de selectedOptionBattery

    useEffect(() => {
        axios.get(`${window.location.origin}/api/get/weight/${selectedOptionWeight}`)
            .then(res => {
                // Fonction pour formater les dates en français
                function formatDate(dateString) {
                    const date = new Date(dateString);
                    const datePart = date.toLocaleDateString('fr-FR');
                    const timePart = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                    return `${datePart} à ${timePart}`;
                }
        
                // Extraction des valeurs de weight et des dates formatées
                const formattedData = {
                    labels: res.data.map(message => formatDate(message.messageDateTime)),
                    datasets: [{
                        label: 'poids',
                        data: res.data.map(message => message.weight),
                        fill: false,
                        borderColor: 'rgb(153, 102, 255)',
                        tension: 0.5 // Ajuster pour accentuer l'interpolation
                    }]
                };

                setWeightData(formattedData);
            })
            .catch(err => {
                console.error("Erreur lors du chargement des données du poids", err);
            });
    }, [selectedOptionWeight]); // Ecoute uniquement les changements de selectedOptionWeight

    return (
        <div>
            <Navbar />
            <div className="page">
                <section className="stats">
                    <section className="live_infos">
                        <h1>Informations en Direct</h1>
                        <div className="live_value">
                            <div className="live_battery">
                                <h2 className="value_text" id="battery"></h2>
                            </div>
                            <div className="live_poids">
                                <h2 className="value_text" id="poids"></h2>
                            </div>
                        </div>
                    </section>
                    <section className="location">
                        <div className="map">
                            <h1>Localisation</h1>
                            <div id="map"></div>
                        </div>
                        <div className="infos">
                            <h1>Adresse</h1>
                            <div id="address" className="texte_info"></div>
                            <h1>Latitude</h1>
                            <div id="latitude" className="texte_info"></div>
                            <h1>Longitude</h1>
                            <div id="longitude" className="texte_info"></div>
                        </div>
                    </section>
                    <section className="batterie">
                        <div className="history">
                            <div id="battery_table"></div>
                        </div>
                        <div className="graph">
                            <select value={selectedOptionBattery} onChange={handleOptionChangeBattery}>
                                <option value="5">depuis 5 minutes</option>
                                <option value="15">depuis 15 minutes</option>
                                <option value="30">depuis 30 minutes</option>
                                <option value="60">depuis 1 heure</option>
                                <option value="100">tout</option>
                            </select>
                            {batteryData && <BatteryChart data={batteryData} />}
                        </div>
                    </section>
                    <section className="poids">
                        <div className="graph">
                            <select value={selectedOptionWeight} onChange={handleOptionChangeWeight}>
                                <option value="5">depuis 5 minutes</option>
                                <option value="15">depuis 15 minutes</option>
                                <option value="30">depuis 30 minutes</option>
                                <option value="60">depuis 1 heure</option>
                                <option value="100">tout</option>
                            </select>
                            {weightData && <WeightChart data={weightData} />}
                        </div>
                        <div className="history">
                            <div id="poids_table"></div>
                        </div>
                    </section>
                </section>
            </div>
        </div>
    );
}

export default Panel;
