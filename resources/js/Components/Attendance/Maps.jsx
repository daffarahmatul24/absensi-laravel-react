import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const officeLocation = {
    lat: -7.6297,
    lng: 111.513,
};

export default function Map({ userLocation }) {
    return (
        <MapContainer
            center={userLocation || officeLocation}
            zoom={15}
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />

            {userLocation && <Marker position={userLocation} />}

            <Circle center={officeLocation} radius={100} />
        </MapContainer>
    );
}
