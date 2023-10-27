import mapboxgl from 'mapbox-gl'; // Import Mapbox library
import { ObjectHTMLAttributes, useEffect, useRef, useState } from 'react';
import { MapMarker } from '../type';

export declare type MapOptions = {
  display: string;
  markers: MapMarker;
};

require('../CSS/Map.css');
mapboxgl.accessToken =
  'pk.eyJ1IjoicG9ydGF0byIsImEiOiJjbG05OXgweWMwZTc1M2d0Zm5oNWJsMWJoIn0.jv7429nwZERiVl1f6xY3QA';

function Map() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null); // Define the custom type for 'map'
  // const [lng, setLng] = useState(0);
  // const [lat, setLat] = useState(0);
  // const [zoom, setZoom] = useState(9);

  const displayMarkers = function (options: MapOptions) {
    console.log(options);
  };

  useEffect(() => {
    // Check if geolocation is available in the browser
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Update the state with the current position
          console.log('JE SUIS DANS POSITION');
          const { longitude, latitude } = position.coords;
          console.log(longitude, latitude);
          map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            // style: 'mapbox://styles/portato/clmeuwu9s01by01qu4r1v5cru',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom: 9,
          });
        },

        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not available in your browser.');
    }

    // if (map.current) return; // Initialize map only once
  }, []);
  return <div ref={mapContainer} className="map-wrapper" />;
}
export default Map;
