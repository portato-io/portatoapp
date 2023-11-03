import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { MapMarker } from '../type';

require('../CSS/Map.css');
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox GL JS CSS

if (process.env.REACT_APP_MAPBOX_KEY)
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

type GeoData = {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number]; // Note the use of [number, number] instead of number[]
  };
  class: string;
  name: string;
  description: string;
};

interface MapProps {
  geoDatas: GeoData[];
}

function Map({ geoDatas }: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: '/map/style.json',
            center: [longitude, latitude],
            zoom: 9,
          });
          if (map.current) {
            for (const geoData of geoDatas) {
              const el = document.createElement('div');
              el.className = geoData.class;

              new mapboxgl.Marker(el)
                .setLngLat(geoData.geometry.coordinates)
                .setPopup(
                  new mapboxgl.Popup({ offset: 25 }).setHTML(
                    `<h3>${geoData.name}</h3><p>${geoData.description}</p>`
                  )
                )
                .addTo(map.current);

              map.current.setZoom(12);
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
  }, [geoDatas]);

  return <div ref={mapContainer} className="map-wrapper" />;
}

export default Map;
