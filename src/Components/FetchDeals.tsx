import React, { useEffect, useState } from 'react';
import {
  fetchDeals,
  fetchAdressRequest,
  changeStatusDeal,
} from '../linksStoreToFirebase';
import { IDealInfo, IObjectInfo } from '../type';
import { Card, Button } from 'antd';

interface DealInfoWithAddress extends IDealInfo {
  pickupAddress?: string;
  deliveryAddress?: string;
}

const FetchDeals: React.FC<{
  uid?: string | null; // uid is now optional
  heightPortion?: number;
  admin?: boolean;
  filterStatus?: string; // prop for filtering deals based on status
}> = ({ uid, heightPortion = 0.8, admin = false, filterStatus }) => {
  const [deals, setRequest] = useState<DealInfoWithAddress[]>([]);

  useEffect(() => {
    if (!uid) {
      console.log('uid is undefined');
      return;
    }

    const fetchData = async () => {
      try {
        const storesObject = await fetchDeals();
        if (storesObject && typeof storesObject === 'object') {
          const storesArray: DealInfoWithAddress[] = Object.values(
            storesObject
          ) as IDealInfo[];
          for (const deal of storesArray) {
            const addressObject = await fetchAdressRequest(
              deal.request_uid,
              deal.request_id
            );
            if (addressObject && typeof addressObject === 'object') {
              const request = Object.values(addressObject)[0] as IObjectInfo;
              console.log('request: ' + request);
              deal.pickupAddress = request.pickup_adress;
              deal.deliveryAddress = request.delivery_adress;
            }
          }
          setRequest(storesArray);
        } else {
          console.log('Data is not an object:', storesObject);
          setRequest([]);
        }
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [uid]);

  const contact = (uid: string, requestID: string) => {
    console.log('Matching route with id: ' + routeId);
    navigate(`/admin/deal_suggester/${routeId}/${routeUid}`);
  };

  const confirm = (dealID: string) => {
    console.log('Matching route with id: ' + routeId);
    navigate(`/admin/deal_suggester/${routeId}/${routeUid}`);
  };

  const containerHeight = window.innerHeight * heightPortion;
  return (
    <div>
      <div
        style={
          admin ? {} : { height: containerHeight + 'px', overflowY: 'scroll' }
        }
      >
        {deals
          .filter(
            (deal) =>
              (!filterStatus || deal.status === filterStatus) &&
              (!uid || deal.route_uid === uid)
          ) // filter deals based on status and route uid
          .map((deal) => (
            <div
              key={deal.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Card
                style={{ marginTop: '5vh', width: '80%' }}
                title={deal.status}
                actions={[
                  <Button
                    onClick={() => contact(deal.request_uid, deal.request_id)}
                  >
                    Contact
                  </Button>,
                  <Button onClick={() => confirm()}>Confirm</Button>,
                ]}
              >
                {deal.pickupAddress} / {deal.deliveryAddress}
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FetchDeals;
