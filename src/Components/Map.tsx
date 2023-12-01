import mapboxgl from 'mapbox-gl'; // This is a dependency of react-map-gl even if you didn't explicitly install it

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
mapboxgl.workerClass =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
import { useEffect, useRef, useState } from 'react';
import { MapMarker } from '../type';

require('../CSS/Map.css');

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
      map.current.removeSource('route');
      lastClickedMarker.current = null; // Reset the last clicked marker reference
      console.log('Line removed');
    } else {
      // If a different marker is clicked or no line is drawn, draw the line
      lastClickedMarker.current = coordinatesString; // Set the last clicked marker reference
      const sourceData: GeoJSON.Feature<GeoJSON.Geometry> = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [pickup_coordinates, delivery_coordinates],
        },
      };

      if (map.current.getSource('route')) {
        const routeSource = map.current.getSource(
          'route'
        ) as mapboxgl.GeoJSONSource;
        routeSource.setData(sourceData);
      } else {
        map.current.addSource('route', {
          type: 'geojson',
          data: sourceData,
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
      console.log('Line drawn');
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
