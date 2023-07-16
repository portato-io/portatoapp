import React, { useEffect, useState } from 'react';
import { fetchDataOnce } from '../linksStoreToFirebase';
import { useDispatch, useStore } from 'react-redux'; // Import useDispatch and useSelector
import { IRouteInfo } from '../type';
import { Button, Popconfirm, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { setRoute } from '../Store/actions/routeActionCreators';
import { updateObjectStatus } from '../linksStoreToFirebase';
require('../CSS/Send.css');

const FetchRoutes: React.FC<{
  uid: string | null | undefined;
  heightPortion?: number;
  admin?: boolean;
}> = ({ uid, admin = false }) => {
  const [routes, setInitRoute] = useState<IRouteInfo[]>([]);
  const [refreshKey, setRefreshKey] = useState(0); // add this line
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Define dispatch

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
            setInitRoute(routesArray);
          } else {
            console.error('Invalid store array');
            setInitRoute([]);
          }
        } else {
          console.log('Data is not an object:', storesObject);
          setInitRoute([]);
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
  const store = useStore();

  const editRoute = (route: IRouteInfo) => {
    console.log('Dispatching setRoute with the following route data:', route);
    dispatch(setRoute(route));
    const state = store.getState();
    console.log('State after dispatching setRoute:', state);
    navigate('/deliver/enterRoute');
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
              <h4>
                {t('driveOverview.tripTitle')} #{index + 1}
              </h4>

              <div className="card-actions">
                <div>
                  <Popconfirm
                    title={t('general.deleteConfirm')}
                    onConfirm={() => deleteRoute(route)}
                    onCancel={() => console.log('Cancelled')}
                    okText={t('general.yes')}
                    cancelText={t('general.no')}
                  >
                    <Button type="link">
                      <i className="icon icon-bin"></i>
                      <span className="mod-hide-mobile">
                        {t('general.delete')}
                      </span>
                    </Button>
                  </Popconfirm>
                </div>
                <div>
                  <Button type="link" onClick={() => editRoute(route)}>
                    <i className="icon icon-edit"></i>
                    <span className="mod-hide-mobile">{t('general.edit')}</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="send-request-card-content">
              <div className="table-wrapper">
                <table className="table">
                  <tr>
                    <th className="th">{t('driveSummary.departureAddress')}</th>
                    <td className="td">{route.departure_adress}</td>
                  </tr>
                  <tr>
                    <th className="th">
                      {t('driveSummary.destinationAddress')}
                    </th>
                    <td className="td">{route.destination_adress}</td>
                  </tr>
                  <tr>
                    <th className="th">{t('driveSummary.acceptableDetour')}</th>
                    <td className="td">{route.acceptable_detour} Km </td>
                  </tr>
                  <tr>
                    <th className="th">{t('driveSummary.driveCapacity')}</th>
                    <td className="td">{route.delivery_capacity}</td>
                  </tr>
                  <tr>
                    <th className="th">{t('driveSummary.tripType')}</th>
                    <td className="td">{route.type}</td>
                  </tr>
                  {admin ? (
                    <tr>
                      <th className="th">Uid</th>
                      <td className="td">{route.uid}</td>
                    </tr>
                  ) : null}
                  {admin ? (
                    <tr>
                      <th className="th">id</th>
                      <td className="td">{route.id}</td>
                    </tr>
                  ) : null}
                  <tr>
                    <th className="th">{t('driveSummary.timing')}</th>
                    <td className="td">
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
