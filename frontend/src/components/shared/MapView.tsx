import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom icon for user location
const UserLocationIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" fill="#3b82f6" fill-opacity="0.2"/>
      <circle cx="12" cy="12" r="3" fill="#3b82f6"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

interface MapMarker {
  position: [number, number];
  title: string;
  description?: string;
  address?: string;
}

interface MapViewProps {
  center: [number, number]; // [latitude, longitude]
  zoom?: number;
  markers?: MapMarker[];
  height?: string;
  className?: string;
  userLocation?: [number, number] | null;
}

// Component to update map view when center changes
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  
  return null;
}

export const MapView = ({ 
  center, 
  zoom = 13, 
  markers = [], 
  height = '400px',
  className = '',
  userLocation = null
}: MapViewProps) => {
  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ height, width: '100%' }}
      className={`rounded-lg shadow-md ${className}`}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapUpdater center={center} />
      
      {/* User location marker */}
      {userLocation && (
        <Marker position={userLocation} icon={UserLocationIcon}>
          <Popup>
            <div className="p-2">
              <strong className="text-base">Your Location</strong>
              <p className="text-sm text-gray-600 mt-1">You are here</p>
            </div>
          </Popup>
        </Marker>
      )}
      
      {/* Doctor markers */}
      {markers.map((marker, idx) => (
        <Marker key={idx} position={marker.position}>
          <Popup>
            <div className="p-2">
              <strong className="text-base">{marker.title}</strong>
              {marker.description && (
                <p className="text-sm text-gray-600 mt-1">{marker.description}</p>
              )}
              {marker.address && (
                <p className="text-xs text-gray-500 mt-1">{marker.address}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
