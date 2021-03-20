import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header.component';
import Tile from "./components/Tile/Tile.component";
import Table from "./components/Table/Table.component";
import LineGraph from './components/LineGraph/LineGraph.component';
import { sortData } from "./utils";

import {FormControl, MenuItem, Select, Card, CardContent } from "@material-ui/core";
import './App.css';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(res => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData()
  }, []);
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === 'worldwide'
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode)
        setCountryInfo(data);
      })
  }

  return (
    <div className="app">
      <div className="app__left">
        <Header countries={countries} onCountryChange={onCountryChange} country={country} />

        <div className="app__stats">
          <Tile mode='details' title='New Cases Today' cases={countryInfo.todayCases} total={countryInfo.cases} />
          <Tile mode='details' title='Recovered Today' cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <Tile mode='details' title='Deaths Today' cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
          <Tile title='Population Infected' cases={countryInfo.cases} total={countryInfo.population} />
          <Tile title='Recovered' cases={countryInfo.recovered} total={countryInfo.cases} />
          <Tile title='Deaths' cases={countryInfo.deaths} total={countryInfo.cases} />
        </div>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          <h3>Worldwide view {casesType}</h3>
          <LineGraph casesType={casesType}/>
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
