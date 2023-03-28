import {Button} from "antd"



function NextButton(){
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
        <Button type="primary" size="large" style={{ marginRight: '16px' }} >Next</Button>
      </div>
    );
  };
  export default NextButton;
