import React,{useState} from 'react';
import {Drawer} from "antd";
import HeaderBar from './HeaderBar';
import { Layout, Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';



function SideBarNav({openMenu, setOpenMenu}:any){

  //const [openMenu, setOpenMenu] = useState(false)

    return (
      <div>
        <Drawer
        open = {openMenu}
        closable = {true}
        onClose={()=>{
            setOpenMenu(false);
        }}
        className = "side-drawer"
        style = {{background : "#1875BC"}}
        >
            <HeaderBar isInline setOpenMenu = {setOpenMenu}/>
        </Drawer>
      </div>

    );
  };

  export default SideBarNav;
