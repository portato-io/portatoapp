import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { MapMarker } from '../type';

require('../CSS/Map.css');
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox GL JS CSS

if (process.env.REACT_APP_MAPBOX_KEY)
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

type GeoData = {
  type: string;
  geometry: {
    type: string;
    pickup_coordinates: [number, number]; // Note the use of [number, number] instead of number[]
    delivery_coordinates: [number, number];
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
  const [selectedPoint, setSelectedPoint] = useState<[number, number] | null>(
    null
  );
  const lastClickedMarker = useRef<string | null>(null);

  const drawLine = (
    pickup_coordinates: [number, number],
    delivery_coordinates: [number, number]
  ) => {
    if (!map.current) return;

    const coordinatesString = pickup_coordinates.join(',');
    const isSameMarkerClicked = lastClickedMarker.current === coordinatesString;

    // If the same marker is clicked and the line is currently drawn, remove it
    if (isSameMarkerClicked && map.current.getLayer('route')) {
      map.current.removeLayer('route');
      map.current.removeLayer('marker');
      map.current.removeSource('route');
      map.current.removeSource('marker');
      lastClickedMarker.current = null; // Reset the last clicked marker reference
      console.log('Line and marker removed');
    } else {
      // If a different marker is clicked or no line is drawn, draw the line and add the marker
      lastClickedMarker.current = coordinatesString; // Set the last clicked marker reference

      const lineSourceData: GeoJSON.Feature<GeoJSON.Geometry> = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [pickup_coordinates, delivery_coordinates],
        },
      };

      const markerSourceData: GeoJSON.Feature<GeoJSON.Geometry> = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: delivery_coordinates,
        },
      };

      // Draw or update the line
      if (map.current.getSource('route')) {
        const routeSource = map.current.getSource(
          'route'
        ) as mapboxgl.GeoJSONSource;
        routeSource.setData(lineSourceData);
      } else {
        map.current.addSource('route', {
          type: 'geojson',
          data: lineSourceData,
        });

        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#888',
            'line-width': 8,
          },
        });
      }

      // Add or update the marker
      if (map.current.getSource('marker')) {
        const markerSource = map.current.getSource(
          'marker'
        ) as mapboxgl.GeoJSONSource;
        markerSource.setData(markerSourceData);
      } else {
        map.current.addSource('marker', {
          type: 'geojson',
          data: markerSourceData,
        });

        map.current.addLayer({
          id: 'marker',
          type: 'circle',
          source: 'marker',
          paint: {
            'circle-radius': 10,
            'circle-color': '#FF0000', // Red color for the marker
          },
        });
      }

      // Calculate bounding box from line coordinates
      // Calculate bounding box from line coordinates
      const bounds: mapboxgl.LngLatBoundsLike = [
        [
          Math.min(pickup_coordinates[0], delivery_coordinates[0]),
          Math.min(pickup_coordinates[1], delivery_coordinates[1]),
        ],
        [
          Math.max(pickup_coordinates[0], delivery_coordinates[0]),
          Math.max(pickup_coordinates[1], delivery_coordinates[1]),
        ],
      ];

      // Fit map to the bounding box
      map.current.fitBounds(bounds, { padding: 20 });

      console.log('Line and marker drawn');
    }
  };

  useEffect(() => {
    const defaultCoordinates = { longitude: 8.5417, latitude: 47.3769 }; // Coordinates of Zurich

    const initializeMap = (coords: any) => {
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: '/map/style.json',
        center: [coords.longitude, coords.latitude],
        zoom: 9,
      });
      if (map.current) {
        for (const geoData of geoDatas) {
          const el = document.createElement('div');
          el.className = geoData.class;

          new mapboxgl.Marker(el)
            .setLngLat(geoData.geometry.pickup_coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<h3>${geoData.name}</h3><p>${geoData.description}</p>`
              )
            )
            .addTo(map.current);

          el.addEventListener('click', () => {
            console.log('click');
            setSelectedPoint(geoData.geometry.pickup_coordinates);
            drawLine(
              geoData.geometry.pickup_coordinates,
              geoData.geometry.delivery_coordinates
            ); // Example: draw line to same point for now
          });

          map.current.setZoom(12);
        }
      }
    };
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          initializeMap({ longitude, latitude });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
          initializeMap(defaultCoordinates); // Initialize map with Zurich coordinates
        }
      );
    } else {
      console.error('Geolocation is not available in your browser.');
      initializeMap(defaultCoordinates); // Initialize map with Zurich coordinates
    }
  }, [geoDatas]);

  return <div ref={mapContainer} className="map-wrapper" />;
}

export default Map;
