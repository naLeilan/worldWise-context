import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useState } from "react";
import { useCities } from "../context/CitiesContext";

function Map() {
  // const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([51.92, 4.46]);
  const [searchParam] = useSearchParams();
  const mapLat = searchParam.get("lat");
  const mapLng = searchParam.get("lng");

  console.log(mapLat, mapLng);
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={9}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={[mapLat || 51.92, mapLng || 4.46]} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default Map;
