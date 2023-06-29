import React, { useEffect, useState } from 'react';
import { fetchDataOnce } from '../linksStoreToFirebase';
import { IRouteInfo } from '../type';
import { Button, Popconfirm, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { updateObjectStatus } from '../linksStoreToFirebase';
require('../CSS/Send.css');
const { Title } = Typography;

const FetchRoutes: React.FC<{
  uid: string | null | undefined;
  heightPortion?: number;
  admin?: boolean;
}> = ({ uid, heightPortion = 0.8, admin = false }) => {
  const [routes, setRoute] = useState<IRouteInfo[]>([]);
  const [refreshKey, setRefreshKey] = useState(0); // add this line
  const { t } = useTranslation<string>();

  useEffect(() => {
    if (!uid) {
      console.log('uid is undefined');
      return;
    }

    const getUserRoutes = async () => {
      try {
        const storesObject = await fetchDataOnce(uid, 'routes');

        if (storesObject && typeof storesObject === 'object') {
          let routesArray = Object.values(storesObject) as IRouteInfo[];

          if (Array.isArray(routesArray)) {
            routesArray = routesArray.filter(
              (route) => route.routeStatus !== 'deleted'
            );
            setRoute(routesArray);
          } else {
            console.error('Invalid store array');
            setRoute([]);
          }
        } else {
          console.log('Data is not an object:', storesObject);
          setRoute([]);
        }
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    getUserRoutes();
  }, [uid, refreshKey]); // add refreshKey as a dependency

  const deleteRoute = (route: IRouteInfo) => {
    updateObjectStatus(route.uid, route.id, 'deleted', 'routes').then(() => {
      setRefreshKey((oldKey) => oldKey + 1); // update the refreshKey state
    });
  };

  // Return early, if no requests exist; avoid adding the title altogether.
  if (routes.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="spacer-big"></div>
      {admin ? null : <h2>{t('driveOverview.currentTitle')}</h2>}
      {routes.map((route, index) => (
        <div
          key={route.id}
          className="current-send-requests-list listing listing-boxes listing-vertical listing-background-style"
        >
          <div
            className={`send-request-card box-shadow ${
              route.routeStatus === 'matched' ? 'highlight-card' : ''
            }`}
          >
            <div className="send-request-card-header mod-display-flex mod-flex-space-between">
              <h4>My Trip #{index + 1}</h4>

              <div className="card-actions">
                <div>
                  <Popconfirm
                    title={t('general.deleteConfirm')}
                    onConfirm={() => deleteRoute(route)}
                    onCancel={() => console.log('Cancelled')}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="link">
                      <i className="icon icon-bin"></i>
                      <span className="mod-hide-mobile">
                        {t('general.delete')}
                      </span>
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            </div>
            <div className="send-request-card-content">
              <div className="table-wrapper">
                <table>
                  <tr>
                    <th>{t('driveSummary.departureAddress')}</th>
                    <td>{route.departure_adress}</td>
                  </tr>
                  <tr>
                    <th>{t('driveSummary.destinationAddress')}</th>
                    <td>{route.destination_adress}</td>
                  </tr>
                  <tr>
                    <th>{t('driveSummary.acceptableDetour')}</th>
                    <td>{route.acceptable_detour} Km </td>
                  </tr>
                  <tr>
                    <th>{t('driveSummary.driveCapacity')}</th>
                    <td>{route.delivery_capacity}</td>
                  </tr>
                  <tr>
                    <th>{t('driveSummary.tripType')}</th>
                    <td>{route.type}</td>
                  </tr>
                  {admin ? (
                    <tr>
                      <th>Uid</th>
                      <td>{route.uid}</td>
                    </tr>
                  ) : null}
                  {admin ? (
                    <tr>
                      <th>id</th>
                      <td>{route.id}</td>
                    </tr>
                  ) : null}
                  <tr>
                    <th>{t('driveSummary.timing')}</th>
                    <td>
                      {route.type == t('driveTime.recurringRide') ? (
                        <div>
                          <Typography>
                            {t('driveSummary.each')}{' '}
                            {route.days && typeof route.days === 'object'
                              ? Object.values(route.days)
                              : 'No data for days'}
                            <br />
                            {t('driveSummary.tripTime')}{' '}
                            {route.time && typeof route.time === 'object'
                              ? Object.values(route.time)
                              : 'No data for time'}{' '}
                          </Typography>
                        </div>
                      ) : (
                        <div>
                          <Typography>
                            {t('driveSummary.tripDate')} {route.timeRange}{' '}
                            <br />
                            {t('driveSummary.tripTime')}{' '}
                            {route.time && typeof route.time === 'object'
                              ? Object.values(route.time)
                              : 'No data for time'}
                          </Typography>
                        </div>
                      )}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FetchRoutes;
