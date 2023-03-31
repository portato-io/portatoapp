import {Button} from "antd"
import { useNavigate } from 'react-router-dom';


function NextButton({nextScreen = "/"}:any){

  const navigate = useNavigate();

  const handleNextClick = () => {

    console.log(nextScreen);
    navigate(nextScreen);
  };
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
        <Button type="primary" size="large" onClick={handleNextClick} style={{ marginRight: '16px' }} >Next</Button>
      </div>
    );
  };
  export default NextButton;
