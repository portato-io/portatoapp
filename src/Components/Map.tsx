import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';

require('../CSS/Map.css');
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox GL JS CSS
import { Popup } from 'antd-mobile';
import { MAP_ZOOM_OFFSET } from '../constant';
import { IRequestInfo } from '../type';

if (process.env.REACT_APP_MAPBOX_KEY)
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

interface MapProps {
  requests: IRequestInfo[];
}

function Map({ requests }: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [visible, setVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<IRequestInfo | null>(
    null
  );

  const drawLine = (
    pickup_coordinates: [number, number],
    delivery_coordinates: [number, number]
  ) => {
    if (map.current) {
      // Define the source data for the line
      const lineData: GeoJSON.Feature<GeoJSON.LineString> = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [pickup_coordinates, delivery_coordinates],
        },
        properties: {},
      };

      // Check if the map already has a source and layer for the route
      if (map.current.getSource('route')) {
        // Update the data if it exists
        (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData(
          lineData
        );
      } else {
        // Add the source and layer if it doesn't exist
        map.current.addSource('route', {
          type: 'geojson',
          data: lineData,
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
            'line-color': '#ff0000',
            'line-width': 4,
          },
        });
      }
    }
  };

  // Function to add markers to the map
  const addMarkers = (mapInstance: mapboxgl.Map, requests: IRequestInfo[]) => {
    requests.forEach((request) => {
      const el = document.createElement('div');
      el.className = 'box-marker'; // Use the CSS class for styling

      new mapboxgl.Marker(el)
        .setLngLat(request.pickup_coordinates)
        .addTo(mapInstance);

      el.addEventListener('click', () => {
        setSelectedRequest(request);
        setVisible(true);
        drawLine(request.pickup_coordinates, request.delivery_coordinates);
      });
    });
  };

  // Initialize the map
  useEffect(() => {
    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [8.5417, 47.3769], // Default center: Zurich
        zoom: 9,
      });

      map.current.on('load', () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { longitude, latitude } = position.coords;
              map.current!.setCenter([longitude, latitude]);
              map.current!.setZoom(12);
              addMarkers(map.current!, requests); // Add markers after setting center
            },
            (error) => {
              console.error('Error getting geolocation:', error);
              addMarkers(map.current!, requests); // Add markers with default center
            }
          );
        } else {
          console.error('Geolocation is not available in your browser.');
          addMarkers(map.current!, requests); // Add markers with default center
        }
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []); // Empty dependencies array to ensure this effect runs once after the component mounts

  return (
    <div className="portato-map">
      <div ref={mapContainer} className="map-wrapper" />
      {selectedRequest && (
        <Popup
          visible={visible}
          onMaskClick={() => {
            setVisible(false);
            setSelectedRequest(null); // Reset the selected request when closing the popup
          }}
          bodyStyle={{
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            minHeight: '20vh',
            padding: '10px',
          }}
        >
          <div>
            <strong>Name:</strong> {selectedRequest.name}
            <br />
            <strong>Description:</strong> {selectedRequest.description}
            <br />
            <strong>Size:</strong> {selectedRequest.size}
            <br />
            <strong>Weight:</strong> {selectedRequest.weight}
            <br />
            <strong>Price:</strong> {selectedRequest.price}
            <br />
            <strong>Pickup Address:</strong> {selectedRequest.pickup_address}
            <br />
            <strong>Delivery Address:</strong>{' '}
            {selectedRequest.delivery_address}
            <br />
            <strong>Date Range:</strong>{' '}
            {selectedRequest.dateRange.join(' to ')}
            <br />
            <strong>Time:</strong> {selectedRequest.time}
            <br />
            {selectedRequest.images && selectedRequest.images.length > 0 && (
              <div>
                {selectedRequest.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Request Image ${index + 1}`}
                    style={{ maxWidth: '100%', marginTop: '5px' }}
                  />
                ))}
              </div>
            )}
          </div>
        </Popup>
      )}
    </div>
  );
}

export default Map;
