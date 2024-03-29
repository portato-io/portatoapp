import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
// import plusImg from '../../Assets/Images/plus_icon.png';

require('../../CSS/FillOutForms.css');

export function ButtonToCreateNewReqRoutes({
  nextScreen = '/',
  text = '',
  onClick = () =>
    console.log('Button clicked without an onClick handler provided'),
}: any) {
  const navigate = useNavigate();

  const handleSendClick = () => {
    navigate(nextScreen);
    onClick();
  };

  return (
    <a
      className="button button-solid box-shadow box-radius-default box-shadow-effect"
      onClick={handleSendClick}
    >
      <i className="icon icon-plus"></i>
      <span>{text}</span>
    </a>
  );
}
