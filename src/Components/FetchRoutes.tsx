import React, { useEffect, useState } from 'react';
import { fetchDataOnce } from '../linksStoreToFirebase';
import { IRouteInfo } from '../type';
import { DeleteOutlined } from '@ant-design/icons';
import { Card, Button, Popconfirm } from 'antd';
import { useNavigate } from 'react-router';
import { updateObjectStatus } from '../linksStoreToFirebase';

const FetchRoutes: React.FC<{
  uid: string | null | undefined;
  heightPortion?: number;
  admin?: boolean;
}> = ({ uid, heightPortion = 0.8, admin = false }) => {
  const [routes, setRoute] = useState<IRouteInfo[]>([]);
  const [refreshKey, setRefreshKey] = useState(0); // add this line
  const navigate = useNavigate();

  useEffect(() => {
    if (!uid) {
      console.log('uid is undefined');
      return;
    }

    const fetchData = fetchDataOnce(uid, 'routes').then((storesObject) => {
      if (storesObject && typeof storesObject === 'object') {
        const storesArray = Object.values(storesObject) as IRouteInfo[];
        return storesArray;
      } else {
        console.log('Data is not an object:', storesObject);
        return [];
      }
    });

    const getUserRoutes = async () => {
      try {
        setRoute(await fetchData);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    getUserRoutes();
  }, [uid, refreshKey]); // add refreshKey as a dependency

  const match = (routeId: string, routeUid: string) => {
    console.log('Matching route with id: ' + routeId);
    navigate(`/admin/deal_suggester/${routeId}/${routeUid}`);
  };

  const deleteRoute = (request: IRouteInfo) => {
    updateObjectStatus(request.uid, request.id, 'deleted', 'routes').then(
      () => {
        setRefreshKey((oldKey) => oldKey + 1); // update the refreshKey state
      }
    );
  };

  return (
    <section className="section">
      <div className="spacer-big"></div>
      {routes.map((route) => (
        <div
          key={route.id}
          className="current-send-requests-list listing listing-boxes listing-vertical listing-background-style"
        >
          <div className={'send-request-card box-shadow'}>
            <div className="send-request-card-header">
              <h4>{route.id}</h4>
            </div>
            <div className="send-request-card-content">
              <div className="table-wrapper">
                <table>
                  <tr>
                    <th>Departure Address</th>
                    <td>{route.departure_adress}</td>
                  </tr>
                  <tr>
                    <th>Destination Address</th>
                    <td>{route.destination_adress}</td>
                  </tr>
                </table>
              </div>
              {admin ? <pre>{JSON.stringify(route, null, 2)}</pre> : null}
              <div style={{ alignSelf: 'flex-end' }}>
                <Popconfirm
                  title="Do you want to delete this request?"
                  onConfirm={() => deleteRoute(route)}
                  onCancel={() => console.log('Cancelled')}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link">
                    <DeleteOutlined />
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FetchRoutes;
