import { Radio } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
//import './CustomRadio.css'; // Import the CSS file where you define the custom styles

const CustomRadio = () => {
  return (
    <Radio
      className="custom-radio"
      //   checked={true}
      style={{ position: 'relative' }}
    >
      <div className="radio-icon">
        <CheckCircleOutlined />
      </div>
      <div className="radio-label">Label</div>
    </Radio>
  );
};

export default CustomRadio;
