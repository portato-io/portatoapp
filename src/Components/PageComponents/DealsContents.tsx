import Typography from 'antd/es/typography/Typography';
import FetchDeals from '../FetchDeals';
import { useAuth } from '../AuthProvider';

function DealsContent() {
  const { uid } = useAuth();
  return (
    <div style={{ height: '100vh' }}>
      <Typography> Confirmed Deliverires </Typography>
      <FetchDeals uid={uid} heightPortion={0.5} filterStatus={'Confirmed'} />
      <Typography> Delivery Suggestions(Coming) </Typography>
      <FetchDeals uid={uid} heightPortion={0.5} filterStatus={'Suggestion'} />
    </div>
  );
}
export default DealsContent;
