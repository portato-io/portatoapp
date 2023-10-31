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
function Map() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null); // Define the custom type for 'map'
  // const [lng, setLng] = useState(0);
  // const [lat, setLat] = useState(0);
  // const [zoom, setZoom] = useState(9);
  // const test = {
  //   type: 'FeatureCollection',
  //   features: [
  //     {
  //       type: 'Feature',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [46.5196535, 6.6322734],
  //       },
  //       properties: {
  //         title: 'Mapbox',
  //         description: 'CUSTOM PIN',
  //       },
  //     },
  //   ],
  // };
  const features: Array<{
    type: 'Feature';
    geometry: Coordinates;
    class: string;
  }> = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [6.6322734, 46.5196535],
      },
      class: 'box-marker',
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [6.6522778, 46.5196535],
      },
      class: 'car-marker',
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [6.7022785, 46.5196535],
      },
      class: 'box-marker',
    },
  ];

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
            for (const feature of features) {
              console.log(feature);
              // create a HTML element for each feature
              const el = document.createElement('div');
              // make a marker for each feature and add to the map
              el.className = feature.class;

              new mapboxgl.Marker(el)
                .setLngLat(feature.geometry.coordinates)
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
  }, []);

  return <div ref={mapContainer} className="map-wrapper" />;
}
export default Map;
