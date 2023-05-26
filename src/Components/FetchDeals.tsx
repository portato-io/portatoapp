import React, { useEffect, useState } from 'react';
import { fetchDeals, changeDealStatus } from '../linksStoreToFirebase';
import { IDealInfo } from '../type';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router';

const FetchDeals: React.FC<{
  uid?: string | null; // uid is now optional
  heightPortion?: number;
  admin?: boolean;
  filterStatus?: string; // prop for filtering deals based on status
}> = ({ uid, heightPortion = 0.8, admin = false, filterStatus }) => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState<IDealInfo[]>([]);

  useEffect(() => {
    if (!uid) {
      console.log('uid is undefined');
      return;
    }

    const fetchData = async () => {
      try {
        const dealsObject = await fetchDeals(uid);
        if (dealsObject && typeof dealsObject === 'object') {
          const dealsArray: IDealInfo[] = Object.values(
            dealsObject
          ) as IDealInfo[];
          setDeals(dealsArray);
        } else {
          console.log('Data is not an object:', dealsObject);
          setDeals([]);
        }
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [uid]);

  const contact = (requestUid: string, requestID: string) => {
    console.log('Contacting ' + requestUid + ' for request ' + requestID);
    navigate(`/contact_sender/${requestUid}/${requestID}`);
  };

  const confirm = (dealID: string) => {
    changeDealStatus(dealID, 'Confirmed');
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
          .filter((deal) => !filterStatus || deal.status === filterStatus)
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
                actions={
                  filterStatus === 'Suggestion'
                    ? [
                        <Button
                          onClick={() =>
                            contact(deal.request.uid, deal.request.id)
                          }
                        >
                          Contact
                        </Button>,
                        <Button onClick={() => confirm(deal.id)}>
                          Confirm
                        </Button>,
                      ]
                    : []
                }
              >
                {deal.request.pickup_adress} / {deal.request.delivery_adress}
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FetchDeals;
