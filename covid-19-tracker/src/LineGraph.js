import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { casesTypeColors } from "./util";


const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    //Include a $ sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ]
    },
};

// ...props to get the app_graph from App.js
function LineGraph({ casesType = 'cases', ...props }) {
    const [data, setData] = useState({});

    const buildChartData = (data, casesType = 'cases') => {
        const chartData = [];
        let lastDataPoint;

        for (let date in data.cases) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint // (data.. - lastDataPoint) to get the new cases 
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }
    // https://disease.sh/v3/covid-19/historical/all?lastdays=all

    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
                .then(response => response.json())
                .then(data => {
                    let chartData = buildChartData(data, casesType);
                    setData(chartData);
                });
        }
        fetchData();
    }, [casesType]);



    return (
        <div className={props.className}>
            {/* (error handling) Optional chaining to check if there is data, else return undefined*/}
            {data?.length > 0 && (
                <Line
                    options={options}
                    data={{
                        datasets: [{
                            backgroundColor: casesTypeColors[casesType].backgroundColor,
                            borderColor: casesTypeColors[casesType].hex,
                            data: data,
                        }]
                    }}
                />)}
        </div>
    )
}

export default LineGraph
