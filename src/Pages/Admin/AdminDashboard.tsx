import React from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { AutoCenter } from 'antd-mobile';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleAllRequestsClick = () => {
    // Navigate to the "All Requests" page
    navigate('/admin/all_requests');
  };

  const handleAllRoutesClick = () => {
    // Navigate to the "All Routes" page
    navigate('/admin/all_routes');
  };

  return (
    <PageLayout>
      <AutoCenter>
        <Button
          type="default"
          size="large"
          style={{
            marginTop: '16px',
          }}
          onClick={handleAllRequestsClick}
        >
          All Requests
        </Button>
        <Button
          type="default"
          size="large"
          style={{
            marginTop: '16px',
          }}
          onClick={handleAllRoutesClick}
        >
          All Routes
        </Button>
      </AutoCenter>
    </PageLayout>
  );
};

export default AdminDashboard;
