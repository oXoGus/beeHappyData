import React, { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import axios from "axios";
import Map from "../component/Map";

import '../styles/style.css';
import '../styles/panel.css';
import BatteryChart from "../component/BatteryChart";
import WeightChart from "../component/WeightChart";
import Button from "../component/button";

/*
const setBatteryProgress = (progress) => {
  const percent = Math.min(Math.max(progress, 0), 100);
  const svgCircle = document.querySelector('.RadialBattery .percent svg circle:nth-child(2)');
  const hue = 120 * (percent / 100); // Calcul de la teinte en fonction du pourcentage

  svgCircle.style.stroke = `hsl(${hue}, 100%, 50%)`; // Utilisation de hsl pour définir la couleur en fonction de la teinte calculée
  svgCircle.style.strokeDashoffset = `calc(440 - (440 * ${percent}) / 100)`; // Mise à jour du décalage de la ligne de contour en fonction du pourcentage
}
*/

function Panel() {

    const [batteryDataNow, setBatteryDataNow] = useState(null);
    const [weightyDataNow, setWeightDataNow] = useState(null);
    const [reloadBatteryData, setReloadBatteryData] = useState(true);
    const [reloadWeightData, setReloadWeightData] = useState(true);
    const [batteryData, setBatteryData] = useState(null);
    const [selectedOptionBattery, setSelectedOptionBattery] = useState('30');
    const [weightData, setWeightData] = useState(null);
    const [selectedOptionWeight, setSelectedOptionWeight] = useState('30');
    const [coords, setCoords] = useState(null);
    const [address, setAddress] = useState(null);

    const handleOptionChangeBattery = (event) => {
        setSelectedOptionBattery(event.target.value);
    };

    const handleOptionChangeWeight = (event) => {
        setSelectedOptionWeight(event.target.value);
    };

    useEffect(() => {
        axios.get(`${window.location.origin}/api/get/battery/1`)
        .then(res => {
            console.log(res.data[0].battery)
            setBatteryDataNow(res.data[0].battery);
            const setBatteryProgress = (progress) => {
                const percent = Math.min(Math.max(progress, 0), 100);
                const svgCircle = document.querySelector('.RadialBattery .percent svg circle:nth-child(2)');
                const hue = 120 * (percent / 100); // Calcul de la teinte en fonction du pourcentage
              
                svgCircle.style.stroke = `hsl(${hue}, 100%, 33%)`; // Utilisation de hsl pour définir la couleur en fonction de la teinte calculée
                svgCircle.style.strokeDashoffset = `calc(440 - (440 * ${percent}) / 100)`; // Mise à jour du décalage de la ligne de contour en fonction du pourcentage
              }

            setBatteryProgress(batteryDataNow);
        })
        .catch(err => {
            console.error("Erreur lors du chargement des données de la batterie en tps réel", err);
        })
        // on reset le reload pour que l'état puisse re changer 
        setReloadBatteryData(false);
    }, [reloadBatteryData])

    useEffect(() => {
        axios.get(`${window.location.origin}/api/get/weight/1`)
        .then(res => {
            setWeightDataNow(res.data[0].weight);
        })
        .catch(err => {
            console.error("Erreur lors du chargement des données de la masse en tps réel", err);
        })

        // on reset le reload pour que l'état puisse re changer 
        setReloadWeightData(false);
    }, [reloadWeightData])

    useEffect(() => {
        axios.get(`${window.location.origin}/api/get/battery/${selectedOptionBattery}`)
            .then(res => {
                function formatDate(dateString) {
                    const date = new Date(dateString);
                    const datePart = date.toLocaleDateString('fr-FR');
                    const timePart = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                    return `${datePart} à ${timePart}`;
                }

                const formattedData = {
                    labels: res.data.map(message => formatDate(message.messageDateTime)),
                    datasets: [{
                        label: 'pourcentage de batterie',
                        data: res.data.map(message => message.battery),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.5
                    }]
                };

                setBatteryData(formattedData);
            })
            .catch(err => {
                console.error("Erreur lors du chargement des données de la batterie:", err);
            });
    }, [selectedOptionBattery]);

    useEffect(() => {
        axios.get(`${window.location.origin}/api/get/weight/${selectedOptionWeight}`)
            .then(res => {
                function formatDate(dateString) {
                    const date = new Date(dateString);
                    const datePart = date.toLocaleDateString('fr-FR');
                    const timePart = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                    return `${datePart} à ${timePart}`;
                }

                const formattedData = {
                    labels: res.data.map(message => formatDate(message.messageDateTime)),
                    datasets: [{
                        label: 'masse de la ruche',
                        data: res.data.map(message => message.weight),
                        fill: false,
                        borderColor: 'rgb(153, 102, 255)',
                        tension: 0.5
                    }]
                };

                setWeightData(formattedData);
            })
            .catch(err => {
                console.error("Erreur lors du chargement des données du poids", err);
            });
    }, [selectedOptionWeight]);

    useEffect(() => {
        axios.get(`${window.location.origin}/api/get/coords/1`)
            .then(res => {
                console.log(res.data[0].coordsLat, res.data[0].coordsLng);
                const coordLat = res.data[0].coordsLat;
                const coordLng = res.data[0].coordsLng;
                const coordinates = [coordLat, coordLng];
                setCoords(coordinates);

                axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordLat}&lon=${coordLng}&zoom=18&addressdetails=1`)
                .then(addressResponse => {
                    setAddress(addressResponse.data.display_name);
                })
                .catch(err => {
                    console.error("Erreur lors du chargement de l'adresse:", err);
                });
            })
            .catch(err => {
                console.error("Erreur lors du chargement des coordonnées:", err);
            });
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <section className="top">
                    <section className="live_values">
                    <div className="RadialBattery">
                            <div className="percent">
                                <svg>
                                <circle cx="70" cy="70" r="70"></circle>
                                <circle cx="70" cy="70" r="70"></circle>
                                </svg>
                                <div className="num">
                                <h2>{batteryDataNow}<span>%</span></h2>
                                </div>
                            </div>
                            <h2 className="text">Batterie</h2>
                            </div>
                        <div className="RadialWeight">
                            <div className="percent">
                                <svg>
                                <circle cx="70" cy="70" r="70"></circle>
                                <circle cx="70" cy="70" r="70"></circle>
                                </svg>
                                <div className="num">
                                <h2>{weightyDataNow}<span>Kg</span></h2>
                                </div>
                            </div>
                            <h2 className="text">Poids</h2>
                            </div>
                    </section>
                    <div className="meteo">
                        
                    </div>
                </section>
                <section className="stats">
                    <section className="location">
                        <div id="map">
                            <div id="map_full">
                                {coords ? <Map coordinates={coords} /> : <p>Chargement de la carte...</p>}
                            </div>
                        </div>
                        <div className="infos">
                            <h1>Adresse</h1>
                            <div id="address" className="texte_info">
                                {address ? <p>{address}</p> : <p>Chargement de l'adresse...</p>}
                            </div>
                            <h1>Latitude</h1>
                            <div id="latitude" className="texte_info">
                                {coords ? <p>{coords[0]}</p> : <p>Chargement de la latitude...</p>}
                            </div>
                            <h1>Longitude</h1>
                            <div id="longitude" className="texte_info">
                                {coords ? <p>{coords[1]}</p> : <p>Chargement de la longitude...</p>}
                            </div>
                            <div className="go_button">
                                {coords && 
                                    <Button as="a" href={`https://www.google.fr/maps/place/${coords[0]},${coords[1]}`} target="_blank">Aller a la ruche !</Button>
                                }
                            </div>
                        </div>
                    </section>
                    <section className="graphiques">
                        <div className="graph_bat">
                            {batteryData && <BatteryChart data={batteryData} />}
                            <select value={selectedOptionBattery} onChange={handleOptionChangeBattery}>
                                <option value="5">depuis 5 minutes</option>
                                <option value="15">depuis 15 minutes</option>
                                <option value="30">depuis 30 minutes</option>
                                <option value="60">depuis 1 heure</option>
                                <option value="100">tout</option>
                            </select>
                        </div>
                        <div className="graph_poids">
                            {weightData && <WeightChart data={weightData} selectedOptionWeight={selectedOptionWeight} />}
                            <select value={selectedOptionWeight} onChange={handleOptionChangeWeight}>
                                <option value="5">depuis 5 minutes</option>
                                <option value="15">depuis 15 minutes</option>
                                <option value="30">depuis 30 minutes</option>
                                <option value="60">depuis 1 heure</option>
                                <option value="100">tout</option>
                            </select>
                        </div>
                    </section>
                </section> 
            </div>
        </div>
    );
}

export default Panel;
