import {Button} from "antd"
import { useNavigate } from 'react-router-dom';


function ConfirmButtom({nextScreen = "/"}:any){

  const navigate = useNavigate();

  const handleConfirmClick = () => {

    console.log(nextScreen);
    navigate("/");
  };
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
        <Button type="primary" size="large" onClick={handleConfirmClick} style={{ marginRight: '16px' }} >Confirm</Button>
      </div>
    );
  };
  export default ConfirmButtom;
