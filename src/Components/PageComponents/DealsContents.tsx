import { useState } from 'react';
import { Card, Button, Typography } from 'antd';
import FetchDeals from '../FetchDeals';
import { useAuth } from '../AuthProvider';

function DealsContent() {
  const { uid } = useAuth();
  const [showConfirmed, setShowConfirmed] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div style={{ height: '100vh' }}>
      <Card title="Confirmed Deliveries">
        <Button onClick={() => setShowConfirmed(!showConfirmed)}>
          {showConfirmed
            ? 'Hide Confirmed Deliveries'
            : 'Show Confirmed Deliveries'}
        </Button>
        {showConfirmed && (
          <FetchDeals
            uid={uid}
            heightPortion={0.4}
            filterStatus={'Confirmed'}
          />
        )}
      </Card>
      <Card title="Delivery Suggestions">
        <Button onClick={() => setShowSuggestions(!showSuggestions)}>
          {showSuggestions
            ? 'Hide Delivery Suggestions'
            : 'Show Delivery Suggestions'}
        </Button>
        {showSuggestions && (
          <FetchDeals
            uid={uid}
            heightPortion={0.4}
            filterStatus={'Suggestion'}
          />
        )}
      </Card>
    </div>
  );
}

export default DealsContent;
