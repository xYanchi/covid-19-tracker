import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const casesTypeColors = {
    cases: {
        // For Map
        hex: "#CC1034",
        multiplier: 800,

        // For graph
        backgroundColor: "rgba(204, 16, 52, 0.4)",
    },
    recovered: {
        // For Map
        hex: "#7dd71d",
        multiplier: 1200,

        // For graph
        backgroundColor: "rgba(125, 215, 29, 0.4)",
    },
    deaths: {
        // For Map
        hex: "#fb4443",
        multiplier: 2000,

        // For graph
        backgroundColor: "rgba(251, 68, 67, 0.4)",
    },
};

export const sortData = (data) => {
    const sortedData = [...data];
    //Sort by biggest cases to lowest cases
    return sortedData.sort((a, b) => b.cases - a.cases);
}

export const prettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";

//Draw circles on map with interactive tooltip
export const showDataOnMap = (data, casesType = "cases") =>
    data.map((country) => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className="info-container">
                    <div className="info-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ));
