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

// function Map(MapOptions?:MapOptions) {

function Map() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null); // Define the custom type for 'map'
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const displayMarkers = function (options: MapOptions) {
    console.log(options);
  };

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/portato/clmeuwu9s01by01qu4r1v5cru',
      center: [lng, lat],
      zoom: zoom,
    });
  }, [lng, lat, zoom]);
  return <div ref={mapContainer} className="map-wrapper" />;
}
export default Map;
