import React,{useState} from 'react';
import { Layout, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';


function ButtomHeaderBar({setOpenMenu}:any){
  
  return (
    <div 
    className='MenuButton'
    style={{height : "100vh" }}>
      
      <div
      style={{textAlign: 'right',backgroundColor : "#1875BC", height : 50,fontSize :20, paddingRight : 24, paddingTop:24}}
      >
        <MenuOutlined onClick={()=>
          setOpenMenu(true)
        }/>
      </div>
    </div>
    )
}

export default ButtomHeaderBar;