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
  lineCoordinates: [[number, number], [number, number]]; // Line start and end coordinates
}

function Map({ geoDatas, lineCoordinates }: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // Initialize the map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: '/map/style.json',
      zoom: 9,
    });

    map.current.on('load', () => {
      // Add the line after the map has been loaded.
      map.current!.addSource('line', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: lineCoordinates,
          },
        },
      });

      map.current!.addLayer({
        id: 'line',
        type: 'line',
        source: 'line',
        layout: {},
        paint: {
          'line-width': 8,
          'line-color': '#3887be',
        },
      });

      // Add markers
      geoDatas.forEach((geoData) => {
        const el = document.createElement('div');
        el.className = geoData.class;

        new mapboxgl.Marker(el)
          .setLngLat(geoData.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h3>${geoData.name}</h3><p>${geoData.description}</p>`
            )
          )
          .addTo(map.current!);
      });

      // Set map view to the first point of the line
      map.current!.flyTo({
        center: lineCoordinates[0],
      });
    });
  }, [geoDatas, lineCoordinates]);

  return <div ref={mapContainer} className="map-wrapper" />;
}

export default Map;
