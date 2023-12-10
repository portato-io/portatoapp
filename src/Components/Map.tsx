import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';

require('../CSS/Map.css');
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox GL JS CSS
import { Popup } from 'antd-mobile';
import { MAP_ZOOM_OFFSET } from '../constant';
import { IRequestInfo } from '../type';
import { Image } from 'antd';
import SignInButton from '../Components/Buttons/SignInButton';
import { useAuth } from './AuthProvider';

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
  requests: IRequestInfo[];
}

function Map({ requests }: MapProps) {
  const [modalKey, setModalKey] = useState(0); // State to hold the key for FirebaseAuth
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    setModalKey((prevKey) => prevKey + 1); // Update key each time the modal is opened
  };

  const handleAuthSuccess = () => {
    setIsModalVisible(false); // Close the modal
  };
  const { uid } = useAuth();
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [visible, setVisible] = useState(false);
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<IRequestInfo | null>(
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
          source: 'marker', // TODO MISCHA: Marker icon :)
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
          Math.min(pickup_coordinates[0], delivery_coordinates[0]) -
            MAP_ZOOM_OFFSET,
          Math.min(pickup_coordinates[1], delivery_coordinates[1]) -
            MAP_ZOOM_OFFSET,
        ],
        [
          Math.max(pickup_coordinates[0], delivery_coordinates[0]) +
            MAP_ZOOM_OFFSET,
          Math.max(pickup_coordinates[1], delivery_coordinates[1]) +
            MAP_ZOOM_OFFSET,
        ],
      ];

      // Fit map to the bounding box
      map.current.fitBounds(bounds, { padding: 20 });
      setVisible(true);
      console.log('Line and marker drawn');
    }
  };

  // Initialize the map
  useEffect(() => {
    const defaultCoordinates = { longitude: 8.5417, latitude: 47.3769 }; //
    // Function to add markers to the map
    const addMarkers = (
      mapInstance: mapboxgl.Map,
      requests: IRequestInfo[]
    ) => {
      requests.forEach((request) => {
        console.log('adding marker for ' + request.pickup_coordinates);
        const el = document.createElement('div');
        el.className = 'box-marker'; // Use the CSS class for styling

        // Reverse the coordinates to [longitude, latitude] order
        const pickupCoordinates = [
          request.pickup_coordinates[1],
          request.pickup_coordinates[0],
        ];
        const deliveryCoordinates = [
          request.delivery_coordinates[1],
          request.delivery_coordinates[0],
        ];

        new mapboxgl.Marker(el)
          .setLngLat(pickupCoordinates as [number, number])
          .addTo(mapInstance);

        el.addEventListener('click', () => {
          setSelectedRequest(request);
          setVisible(true);
          drawLine(
            pickupCoordinates as [number, number],
            deliveryCoordinates as [number, number]
          );
        });
      });
    };
    const initializeMap = (coords: any) => {
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: '/map/style.json',
        center: [coords.longitude, coords.latitude],
        zoom: 9,
      });
      if (map.current) {
        console.log(map.current);
        addMarkers(map.current!, requests);
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

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [requests]); // Empty dependencies array to ensure this effect runs once after the component mounts

  return (
    <div className="map-wrapper">
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
            {selectedRequest.images &&
              selectedRequest.images.length > 0 &&
              $(
                <>
                  <Image
                    preview={false}
                    src={selectedRequest.images[0]}
                    style={{ width: 100, height: 100, cursor: 'pointer' }}
                    onClick={() => setImagePreviewVisible(true)}
                  />
                  {imagePreviewVisible && (
                    <Image.PreviewGroup
                      preview={{
                        visible: imagePreviewVisible,
                        onVisibleChange: (vis) => setImagePreviewVisible(vis),
                      }}
                    >
                      {selectedRequest.images.map((image, index) => (
                        <Image key={index} src={image} />
                      ))}
                    </Image.PreviewGroup>
                  )}
                </>
              )}
          </div>
        </Popup>
      )}
      {uid ? (
        <ConfirmButton
          nextScreen={NEXT_SCREEN}
          onClick={() => {
            handleConfirm();
            logEvent(analytics, 'send_6_summary_confirm_button_click');
          }}
        />
      ) : (
        <div className="signin-container">
          <SignInButton
            onClick={() => {
              showModal();
              logEvent(analytics, 'send_6_summary_signIn_button_click');
            }}
          />
          <p className="text-hint">{t('requestSummary.signInMessage')}</p>
        </div>
      )}
    </div>
  );
}

export default Map;
