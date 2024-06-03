import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function Charts({ data }) {
    const clicksPerSource = {
        labels: Object.keys(data),
        datasets: [{
            label: 'Clicks per Source',
            data: Object.values(data),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const totalClicksData = {
        labels: Object.keys(data),
        datasets: [{
            label: 'Total Clicks per User\'s Links',
            data: Object.values(data),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    const clicksPerDayData = {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: 'Clicks per Day of the Week',
            data: Object.values(data), // Here you should process the data to match the days of the week
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    return (
        <section id="chartsSection">
            <div>
                <h2>Clicks per Source</h2>
                <Bar data={clicksPerSource} options={{ scales: { y: { beginAtZero: true } } }} />
            </div>
            <div>
                <h2>Total Clicks per User's Links</h2>
                <Pie data={totalClicksData} />
            </div>
            <div>
                <h2>Clicks per Day of the Week</h2>
                <Line data={clicksPerDayData} options={{ scales: { y: { beginAtZero: true } } }} />
            </div>
        </section>
    );
}

export default Charts;
