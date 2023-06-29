import React, { useEffect, useState } from 'react';
import { fetchDataOnce } from '../linksStoreToFirebase';
import { IRequestInfo } from '../type';
import { Button, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setStatus, setRequest } from '../Store/actions/dealActionCreators';
import {
  updateObjectStatus,
  fetchRouteUidFromDeal,
  uploadDealToFirebase,
} from '../linksStoreToFirebase';
import { useTranslation } from 'react-i18next';
require('../CSS/Send.css');
// require('../CSS/PortatoStyleSheet.css');

const FetchRequests: React.FC<{
  uid?: string | null; // uid is now optional
  heightPortion?: number;
  admin?: boolean;
}> = ({ uid, heightPortion = 0.8, admin = false }) => {
  const [requests, setRequestState] = useState<IRequestInfo[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation<string>();

  // Mehdi : Use Effect to only fetch the data once when the component is mount
  // fetchDataOnce return a Promise object, we need the .then to decode the promise and store the values
  // then we use await to store the values in state

  const fetchAndSortRequests = async () => {
    if (!uid) {
      console.log('uid is undefined');
      return;
    }

    try {
      const fetchData = await fetchDataOnce(uid, 'requests');
      let requests: IRequestInfo[] = [];

      // Check if fetchData is an object before returning it
      if (fetchData && typeof fetchData === 'object') {
        requests = Object.values(fetchData) as IRequestInfo[];

        // Filter out 'delivery confirmed' requests
        requests = requests.filter(
          (request) =>
            request.status !== 'delivery confirmed' &&
            request.status !== 'deleted'
        );

        // If the user is an admin, only return 'unmatched' requests
        if (admin) {
          requests = requests.filter(
            (request) =>
              request.status === 'unmatched' || request.status === 'new driver'
          );
        }

        requests.sort((a, b) => {
          if (a.status === 'matched') {
            return -1;
          } else if (b.status === 'matched') {
            return 1;
          } else if (a.status === 'contacted') {
            return -1;
          } else if (b.status === 'contacted') {
            return 1;
          }
          return 0;
        });
      } else {
        console.log('Data is not an object:', fetchData);
      }

      setRequestState(requests);
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchAndSortRequests();
  }, [uid]);

  const match = (routeId: string, routeUid: string) => {
    console.log('Matching route with id: ' + routeId);
    navigate(`/admin/deal_suggester/${routeId}/${routeUid}`);
  };

  const noMatch = (request: IRequestInfo) => {
    dispatch(setRequest(request));
    dispatch(setStatus('No Match'));
    uploadDealToFirebase(dispatch);
    updateObjectStatus(request.uid, request.id, 'no match', 'requests');
    console.log('Creating deal with status Backlog for request: ' + request.id);
  };

  const contact = async (request: IRequestInfo) => {
    try {
      const uid = await fetchRouteUidFromDeal(request.dealId); // We use await here to resolve the Promise
      if (uid === undefined) {
        message.error('Error fetching driver information');
      } else {
        console.log('Contacting ' + uid);
        navigate(`/contact_driver/${uid}/${request.uid}/${request.id}`);
      }
    } catch (error) {
      console.log('Error in contacting: ', error);
    }
  };

  const getNewDriver = (request: IRequestInfo) => {
    updateObjectStatus(request.uid, request.id, 'unmatched', 'requests');
    fetchAndSortRequests();
  };

  const confirmDelivery = (request: IRequestInfo) => {
    updateObjectStatus(
      request.uid,
      request.id,
      'delivery confirmed',
      'requests'
    );
    fetchAndSortRequests();
  };

  const deleteRequest = (request: IRequestInfo) => {
    updateObjectStatus(request.uid, request.id, 'deleted', 'requests').then(
      () => {
        fetchAndSortRequests();
      }
    );
  };

  // Return early, if no requests exist; avoid adding the title altogether.
  if (requests.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="spacer-big"></div>
      {admin ? null : <h2>{t('requestOverview.currentTitle')}</h2>}
      {requests.map((request) => (
        <div
          key={request.name}
          className="current-send-requests-list listing listing-boxes listing-vertical listing-background-style"
        >
          <div
            className={`send-request-card box-shadow ${
              request.status === 'matched' ? 'highlight-card' : ''
            }`}
          >
            <div className="send-request-card-header mod-display-flex mod-flex-space-between">
              <h4>{request.name}</h4>
              <div className="card-actions">
                <div>
                  <Popconfirm
                    title={t('general.deleteConfirm')}
                    onConfirm={() => deleteRequest(request)}
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
                <table className="table">
                  <tr>
                    <th className="th">
                      {t('requestOverview.requestList.pickupAddress')}
                    </th>
                    <td className="td">{request.pickup_adress}</td>
                  </tr>
                  <tr>
                    <th className="th">
                      {t('requestOverview.requestList.deliveryAddress')}
                    </th>
                    <td className="td">{request.delivery_adress}</td>
                  </tr>
                  <tr>
                    <th className="th">
                      {t('requestOverview.requestList.dateRange')}
                    </th>
                    <td className="td">
                      {t('requestOverview.requestList.from')}{' '}
                      {request.dateRange[0]}{' '}
                      {t('requestOverview.requestList.to')}{' '}
                      {request.dateRange[1]}
                    </td>
                  </tr>
                  <tr>
                    <th className="th">
                      {t('requestOverview.requestList.time')}
                    </th>
                    <td className="td">{Object.values(request.time)[0]}</td>
                  </tr>
                  <tr>
                    <th className="th">
                      {t('requestOverview.requestList.price')}
                    </th>
                    <td className="td">{request.price} CHF</td>
                  </tr>
                  <tr>
                    <th className="th">
                      {t('requestOverview.requestList.weight')}
                    </th>
                    <td className="td">{request.weight}</td>
                  </tr>
                  <tr>
                    <th className="th">
                      {t('requestOverview.requestList.size')}
                    </th>
                    <td className="td">{request.size}</td>
                  </tr>
                  <tr>
                    <th className="th">
                      {t('requestOverview.requestList.description')}
                    </th>
                    <td className="td">{request.description}</td>
                  </tr>
                </table>
              </div>
              <div>
                {admin ? <pre>{JSON.stringify(request, null, 2)}</pre> : null}
                {request.status === 'contacted' && (
                  <p>
                    Contacted potential driver at{' '}
                    {new Date(request.contactTimestamp).toLocaleString()}
                  </p>
                )}
              </div>
              <div style={{ alignSelf: 'flex-end' }}>
                {admin ? (
                  <>
                    <Button
                      type="primary"
                      onClick={() => match(request.id, request.uid)}
                    >
                      Match
                    </Button>
                    <Button type="primary" onClick={() => noMatch(request)}>
                      No Match
                    </Button>
                  </>
                ) : (
                  request.status === 'matched' && (
                    <Button type="primary" onClick={() => contact(request)}>
                      Contact
                    </Button>
                  )
                )}
                {request.status === 'contacted' && (
                  <>
                    <Button
                      type="primary"
                      onClick={() => getNewDriver(request)}
                    >
                      Get New Driver
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => confirmDelivery(request)}
                    >
                      Confirm Delivery
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FetchRequests;
