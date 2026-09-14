import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";
import L from "leaflet";


const severityColor={
    low: '#4C9EEB',
  medium: '#FFB020',
  high: '#E88A2B',
  critical: '#E5484D',
}
function coloredIcon(severity){
  const color=severityColor[severity] || '#8A94A6';
  return L.divIcon({
    className:"custom-marker",
    html:`<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 6px ${color};"></div>`,
    iconSize:[14,14],
  })
}

function FitBounds({ incidents }) {
  const map = useMap();

  useEffect(() => {
    if (!incidents || incidents.length === 0) return;

    const bounds = L.latLngBounds(
      incidents.map((inc) => {
        const [lng, lat] = inc.location.coordinates;
        return [lat, lng];
      })
    );

    map.fitBounds(bounds, { padding: [40, 40] }); 
  }, [incidents, map]);

  return null; 
}

function IncidentMap({incidents}){
  const defaultCenter=[26.2309, 77.4126];

  return (
    <div className="h-screen w-full p-2">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds incidents={incidents} />

       {incidents?.map((incident)=>{
        const [lng,lat]=incident.location.coordinates;
        return( 
         <Marker key={incident._id} position={[lat, lng]} icon={coloredIcon(incident.severity)}>
           <Popup>
            <strong>{incident.title}</strong>
            <br/>
            {incident.category} - {incident.severity}
            <br/>
            status:{incident.status}
           </Popup>
         </Marker>
        )
})}
      </MapContainer>
        
    </div>
  );
}

export default IncidentMap;
