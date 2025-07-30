import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";


export const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        rgba: "rgba(204, 16, 52, 0.5)",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        rgba: "rgba(125, 215, 29, 0.5)",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        rgba: "rgba(251, 68, 67, 0.5)",
        multiplier: 2000,
    },
};


export const sortData = (data, casesType) => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => (a[casesType] > b[casesType] ? -1 : 1));
};

export const prettyPrintStat = (stat) => {
    return stat ? `+${numeral(stat).format("0.0a")}` : "0";
};

export const showDataOnMap = (data, casesType = 'cases') => (
    data.map(country => (
        <Circle
            key={country.country}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            pathOptions={{
                color: casesTypeColors[casesType].hex,
                fillColor: casesTypeColors[casesType].hex,
            }}
            fillOpacity={0.4}
            radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
            <Popup>
                <div className="info-container">
                    <div
                        className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    />
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))
);