import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import plusImg from '../../Assets/Images/plus_icon.png';

require('../../CSS/FillOutForms.css');

export function ButtonToCreateNewReqRoutes({
  nextScreen = '/',
  text = '',
}: any) {
  const navigate = useNavigate();

  const handleSendClick = () => {
    navigate(nextScreen);
  };
  return (
    <Button
      type="default"
      size="large"
      className="create-new-plus-button"
      onClick={handleSendClick}
    >
      <div className="create-new-plus-layout">
        <div className="create-new-plus-bubble">
          <img src={plusImg} alt="PlusIcon" className="create-new-plus-image" />
        </div>
        <span className="font-large font-bold">{text}</span>
      </div>
    </Button>
  );
}
