import mapboxgl from 'mapbox-gl'; // Import Mapbox library
import { useEffect, useRef, useState } from 'react';

function Map() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null); // Define the custom type for 'map'
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  useEffect(() => {
    if (map.current) return; // Initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });
  }, [lng, lat, zoom]);
  return <div ref={mapContainer} style={{ width: '400px', height: '300px' }} />;
}
export default Map;
