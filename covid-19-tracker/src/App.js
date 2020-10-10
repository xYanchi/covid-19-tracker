import React, { useEffect, useState } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {
    //The code inside will run once when the component loads
    //async, send a request, wait, do retrieve only for name, value
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          //Now we got the whole json response
          const countries = data.map((country) => (
            {
              name: country.country, // United Kingdom, United States, France
              value: country.countryInfo.iso2 // UK, USA, FR
            }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  // 'async' useless without 'await'
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    console.log("CountryCode: ", countryCode)
  }

  return (

    // BEM 
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            {/* default value of country is Worldwide from the state on top */}
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>



        <div className="app_stats">
          <InfoBox title="Coronavirus Cases" cases={1} total={1} />
          <InfoBox title="Recovered" cases={2} total={2} />
          <InfoBox title="Deaths" cases={3} total={3} />
        </div>
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>


    </div>
  );
}

export default App;
