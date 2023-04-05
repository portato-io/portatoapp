import {Button} from "antd"
import { useNavigate } from 'react-router-dom';


function ConfirmButtom({nextScreen = "/"}:any){

  const navigate = useNavigate();

  const handleConfirmClick = () => {

    console.log(nextScreen);
    navigate("/");
  };
    return (
      <div style={{position: 'absolute', bottom:'5%',left:'25%', width:'100%'}}>
        <Button type="primary" size="large" onClick={handleConfirmClick} style={{width : '50%' }} >Confirm</Button>
      </div>
    );
  };
  export default ConfirmButtom;
