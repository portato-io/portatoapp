import React, { useEffect, useState } from 'react';
import { fetchDeals, uploadDealToFirebase } from '../linksStoreToFirebase';
import { IDealInfo } from '../type';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setStatus } from '../Store/actions/dealActionCreators';

const FetchDeals: React.FC<{
  uid?: string | null; // uid is now optional
  heightPortion?: number;
  admin?: boolean;
  filterStatus?: string; // prop for filtering deals based on status
}> = ({ uid, heightPortion = 0.8, admin = false, filterStatus }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    navigate(`/contact_driver/${requestUid}/${requestID}`);
  };

  const confirm = () => {
    dispatch(setStatus('Confirmed'));
    uploadDealToFirebase(dispatch);
  };

  const match = (dealID: string) => {
    console.log('Matching deal with id: ' + dealID);
    // You can put your matching logic here
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
          .filter((deal) =>
            admin
              ? deal.status === 'No match'
              : !filterStatus || deal.status === filterStatus
          )
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
                  deal.status === 'No match' && admin
                    ? [<Button onClick={() => match(deal.id)}>Match</Button>]
                    : filterStatus === 'Suggestion'
                    ? [
                        <Button
                          onClick={() =>
                            contact(deal.request.uid, deal.request.id)
                          }
                        >
                          Contact
                        </Button>,
                        <Button onClick={() => confirm()}>Confirm</Button>,
                      ]
                    : []
                }
              >
                {deal.request.pickup_address} / {deal.request.delivery_adress}
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FetchDeals;
