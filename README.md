# Coview - Virus Tracker - A COVID-19 Data Dashboard

A live, interactive dashboard built with React that visualizes the global impact of COVID-19. The application provides up-to-date statistics for cases, recoveries, and deaths, presented through an interactive map, a data table, and historical trend graphs.

**[➡️ View Live Demo](https://coview-virus-tracker.netlify.app/)**



---

## Features

-   **🌐 Global Statistics:** Displays total worldwide cases, recoveries, and deaths in real-time.
-   **🗺️ Interactive Map:** Visualizes data for every country using color-coded circles on a Leaflet map. The size of the circle represents the magnitude of cases, recoveries, or deaths.
-   **📊 Detailed Pop-ups:** Click on any country's circle to see a pop-up with its flag and detailed statistics.
-   **📈 Historical Data Graph:** Renders a line graph showing the historical trend of new cases, recoveries, or deaths over the last 120 days.
-   **🔍 Dynamic Filtering:**
    -   **By Country:** Select any country from the dropdown menu to see its specific stats, focus the map on it, and view its historical data on the graph.
    -   **By Data Type:** Click on the "Cases", "Recovered", or "Deaths" info boxes to dynamically update the map, graph, and data table to reflect that metric.
-   **📄 Sortable Data Table:** Presents all country data in a clear table format that can be sorted by total cases, recoveries, or deaths.
-   **🔄 Loading Indicators:** Provides a smooth user experience with loading spinners during initial data load and while fetching new graph data.
-   **📱 Responsive Design:** The layout adjusts for a seamless experience on both desktop and mobile devices.

---

## Tech Stack

This project was built using a modern frontend stack:

-   **Core:** [React](https://react.dev/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **UI Components:** [Material-UI](https://mui.com/)
-   **Mapping:** [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
-   **Charting:** [Chart.js](https://www.chartjs.org/) & [React-Chartjs-2](https://react-chartjs-2.js.org/)
-   **Number Formatting:** [Numeral.js](http://numeraljs.com/)
-   **Data Fetching:** Native Browser [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
-   **Deployment:** [Vercel](https://vercel.com/)

---

## Installation and Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**
    git clone https://github.com/sarim-aliii/Coview---Covid-19-Tracker.git

2.  **Navigate to the project directory:**
    cd Coview---Covid-19-Tracker

3.  **Install the dependencies:**
    npm install

4.  **Run the development server:**
    npm run dev

    The application will be available at `http://localhost:5173`.

---

## API Used

This project relies on the free and open-source **[disease.sh API](https://disease.sh/)** for all its COVID-19 data. A huge thank you to the maintainers of this excellent service.

---

## Acknowledgements

This project was built as a hands-on exercise to practice and demonstrate key React concepts, including:

-   State management with `useState` and `useEffect`
-   Component-based architecture
-   API data fetching and handling
-   Working with external libraries and plugins
-   Conditional rendering and styling

It represents a significant step in building complex, data-driven web applications.