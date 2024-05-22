import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; 

const BatteryChart = ({ data }) => {
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
                  interaction: {
                    intersect: false,
                  },
                  scales: {
                    x: {
                      display: true,
                      title: {
                        display: true
                      }
                    },
                    y: {
                      display: true,
                      title: {
                        display: true,
                        text: 'pourcentage de charge'
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
