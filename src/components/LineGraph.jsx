import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

import { casesTypeColors } from "../utils";
import LoadingSpinner from "./LoadingSpinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: (tooltipItem) => {
          return numeral(tooltipItem.raw.y).format("+0,0");
        },
      },
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "time",
      time: {
        parser: "MM/dd/yy",
        tooltipFormat: "ll",
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        callback: (value) => {
          return numeral(value).format("0a");
        },
      },
    },
  },
};


const buildChartData = (data, casesType) => {
  const chartData = [];
  let lastDataPoint;

  if (data[casesType]) {
    for (let date in data[casesType]) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint
        };
       
        if (newDataPoint.y >= 0) {
            chartData.push(newDataPoint);
        }
      }
      lastDataPoint = data[casesType][date];
    }
  }

  return chartData;
}


function LineGraph({ casesType = 'cases', countryCode = 'worldwide', ...props }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const url = countryCode === 'worldwide' ? 
                                  'https://disease.sh/v3/covid-19/historical/all?lastdays=120' :
                                  `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=120`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const apiData = await response.json();

        const chartDataToProcess = countryCode === 'worldwide' ? apiData : apiData.timeline;

        let chartData = buildChartData(apiData, casesType);
        setData(chartData);
      } 
      catch (error) {
        console.error("Error fetching historical data:", error);
        setData([]);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [casesType, countryCode]);


  return (
    <div className={props.className}>
      {
        isLoading ? 
        (
          <LoadingSpinner />
        ) : 
        data?.length > 0 ? 
        (
          <Line
            options={options}
            data={{
              datasets: [
                {
                  data: data,
                  backgroundColor: casesTypeColors[casesType].rgba,
                  borderColor: casesTypeColors[casesType].hex,
                },
              ],
            }}
          />
        ) : 
        (
          <h4>No new {casesType} data available for this period.</h4>
        )
      }
    </div>
  );
}

export default LineGraph;