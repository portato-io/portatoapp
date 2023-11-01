import mapboxgl from 'mapbox-gl'; // Import Mapbox library
import { ObjectHTMLAttributes, useEffect, useRef, useState } from 'react';
import { MapMarker } from '../type';

export declare type MapOptions = {
  display: string;
  markers: MapMarker;
};

require('../CSS/Map.css');
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox GL JS CSS

mapboxgl.accessToken =
  'pk.eyJ1IjoicG9ydGF0byIsImEiOiJjbG05OXgweWMwZTc1M2d0Zm5oNWJsMWJoIn0.jv7429nwZERiVl1f6xY3QA';

interface Coordinates {
  type: 'Point';
  coordinates: [number, number];
}

function Map({ geoDatas }: any) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null); // Define the custom type for 'map'

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
            style: '/map/style.json',
            center: [longitude, latitude],
            zoom: 9,
          });
          if (map.current) {
            for (const geoData of geoDatas) {
              console.log(geoData);
              // create a HTML element for each geoData
              const el = document.createElement('div');
              // make a marker for each geoData and add to the map
              el.className = geoData.class;

              new mapboxgl.Marker(el)
                .setLngLat(geoData.geometry.coordinates)
                .setPopup(
                  new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(`<h3>${'blabl'}</h3><p>${'DESCRIPTION'}</p>`)
                )
                .addTo(map.current!);

              map.current.setZoom(12); // Adjust the zoom level as needed
            }
          }
        },

        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not available in your browser.');
    }

    // if (map.current) return; // Initialize map only once
  }, [geoDatas]);

  return <div ref={mapContainer} className="map-wrapper" />;
}
export default Map;
