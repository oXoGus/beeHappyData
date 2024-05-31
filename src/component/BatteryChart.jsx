import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; 

const BatteryChart = ({ data, selectedOptionBattery }) => {
  const chartRef = useRef(null);
  let myChart = null; // Garder une référence au graphique actuel

  useEffect(() => {
    if (chartRef && chartRef.current) {
            // Détruire le graphique existant s'il y en a un
            if (myChart) {
                myChart.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            myChart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                  cubicInterpolationMode: 'monoton',
                  responsive: true,
                  plugins: {
                    title: {
                      display: false,
                      text: 'Chart.js Line Chart - Cubic interpolation mode'
                    },
                  },
                  elements: {
                    point: {
                        radius: 0 // Supprime les points sur la courbe
                    }
                  },
                  interaction: {
                    intersect: false,
                  },
                  scales: {
                    x: {
                      ticks: {
                        callback: function(value, index, values) {
                          const totalLabels = values.length;
                          const skipCount = Math.max(1, Math.floor(totalLabels / selectedOptionBattery)); 
                          if (index % skipCount === 0) {
                            return this.getLabelForValue(value);
                          }
                          return '';
                        },
                        autoSkip: false, // Désactiver l'autoSkip pour utiliser notre propre logique
                      },
                      display: false,
                      title: {
                        display: false,
                        text: 'Temps'
                      }
                    },
                    y: {
                      display: false,
                      title: {
                        display: false,
                        text: 'Pourcentage'
                      },
                      suggestedMin: 0,
                      suggestedMax: 110
                    }
                  }
                }
            });
        }

        // Nettoyer le graphique lors du démontage du composant
        return () => {
            if (myChart) {
                myChart.destroy();
            }
        };
    }, [data]);

  // on exporte le chart avec comme parametre les données qu'il prends
  return <canvas ref={chartRef} />;
};

export default BatteryChart;
