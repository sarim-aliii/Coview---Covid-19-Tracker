import { MapContainer, TileLayer, useMap} from "react-leaflet"; 
import './Map.css'
import { showDataOnMap } from '../utils.jsx';


function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}


function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contibutors'
        />

        {
          showDataOnMap(countries, casesType)
        }
      </MapContainer>
    </div>
  )
}

export default Map
