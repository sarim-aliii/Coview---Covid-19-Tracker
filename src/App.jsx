import { useEffect, useState } from 'react';
import { Card, CardContent } from '@mui/material';

import Header from './components/Header';
import Infobox from './components/Infobox';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import LoadingSpinner from './components/LoadingSpinner';


import "leaflet/dist/leaflet.css";
import './App.css';
import { sortData, prettyPrintStat } from './utils';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.8077, lng: -100.4698 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const getInitialData = async () => {
      try {
        const [allResponse, countriesResponse] = await Promise.all([
          fetch('https://disease.sh/v3/covid-19/all'),
          fetch('https://disease.sh/v3/covid-19/countries')
        ]);
        const allData = await allResponse.json();
        const countriesData = await countriesResponse.json();

        setCountryInfo(allData);
        setMapCountries(countriesData); 

        const countriesForDropdown = countriesData.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        setCountries(countriesForDropdown);
        
        const sortedData = sortData(countriesData, 'cases');
        setTableData(sortedData);

      } 
      catch (error) {
        console.error("Failed to fetch initial data:", error);
      } 
      finally {
        setIsLoading(false);
      }
    };
    getInitialData();
  }, []);


  useEffect(() => {
    if (mapCountries.length > 0) {
      const sortedData = sortData(mapCountries, casesType);
      setTableData(sortedData);
    }
  }, [casesType]);


  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
  
    const url = countryCode === 'worldwide' ? 
                                'https://disease.sh/v3/covid-19/all' : 
                                `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response => response.json())
    .then((data) => {
      setCountry(countryCode);
      setCountryInfo(data);

      if (countryCode === 'worldwide') {
        setMapCenter({ lat: 34.8077, lng: -100.4698 });
        setMapZoom(3);
      } 
      else {
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      }
    });
  };

  return (
    <div className='app'>
      {
        isLoading ? 
        (
          <LoadingSpinner />
        ) : 
        (
          <>
            <div className="app_left">
              <Header countries={countries} country={country} onCountryChange={onCountryChange} />

              <div className="app_stats">
                <Infobox 
                  title="Coronavirus Cases" 
                  onClick={() => setCasesType('cases')}
                  active={casesType === 'cases'}
                  isRed
                  cases={prettyPrintStat(countryInfo.todayCases)} 
                  total={prettyPrintStat(countryInfo.cases)} 
                />
                <Infobox 
                  title="Recovered" 
                  onClick={() => setCasesType('recovered')}
                  active={casesType === 'recovered'}
                  cases={prettyPrintStat(countryInfo.todayRecovered)} 
                  total={prettyPrintStat(countryInfo.recovered)} 
                />
                <Infobox 
                  title="Deaths" 
                  onClick={() => setCasesType('deaths')}
                  active={casesType === 'deaths'}
                  isRed
                  cases={prettyPrintStat(countryInfo.todayDeaths)} 
                  total={prettyPrintStat(countryInfo.deaths)} 
                />
              </div>

              <Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={mapZoom}/>
            </div>

            <Card className="app_right">
              <CardContent>
                <h3>Live {casesType} by Country</h3>           
                <Table countries={tableData} casesType={casesType} />
                
                <h3 className='app_graphTitle'>
                  {country === 'worldwide' ? 'Worldwide' : countryInfo.country} new {casesType}
                </h3>
                <LineGraph className="app_graph" casesType={casesType} countryCode={country} />
              </CardContent>
            </Card>
          </>
        )
      }
    </div>
  )
}

export default App;