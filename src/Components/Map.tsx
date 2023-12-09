import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Popup } from 'antd-mobile';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox GL JS CSS
import '../CSS/Map.css'; // Make sure this path is correct
import { IRequestInfo } from '../type'; // Make sure this path is correct

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY || '';

const Map: React.FC<{ requests: IRequestInfo[] }> = ({ requests }) => {
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

  // Initialize the map and add markers for each request
  useEffect(() => {
    const mapInstance = map.current; // Handle the map instance separately to please TypeScript
    if (!mapInstance && mapContainer.current) {
      // Initialize the map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [8.5417, 47.3769],
        zoom: 9,
      });
    }

    if (mapInstance) {
      // Add markers to the map for each request
      requests.forEach((request) => {
        const el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(el)
          .setLngLat(request.pickup_coordinates)
          .addTo(mapInstance);

        el.addEventListener('click', () => {
          setSelectedRequest(request);
          setVisible(true);
          drawLine(request.pickup_coordinates, request.delivery_coordinates);
        });
      });
    }

    // Clean up the map instance on unmount
    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [requests]);

  return (
    <div className="map-wrapper">
      <div ref={mapContainer} className="map-container" />
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
};

export default Map;
