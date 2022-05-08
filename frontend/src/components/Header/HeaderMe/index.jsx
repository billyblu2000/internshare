import React from 'react';
import { Popover, Divider, Typography, Button} from 'antd';
import { useNavigate, Link} from 'react-router-dom';
import {UserOutlined, SettingOutlined, MailOutlined, CloudUploadOutlined, SendOutlined} from '@ant-design/icons';
import './index.css'
import Api from '../../../utils/Api';
import { nameToShort } from '../../../utils/utils';


export default function HeaderMe() {

  let nav = useNavigate();

  const [loggedin, setLoggedin] = React.useState(false);
  const [color, setColor] = React.useState(false);
  var starting = React.useRef(true);

  React.useEffect(() => {
    if (starting.current){
      new Api('getUser', [], handleLoginInfo);
      starting.current = false;
    }
  })

  const handleLoginInfo = (res) => {
    if (res.status  === 'ok'){
      setLoggedin(res.name);
      setColor(res.color);
    }
  }

  const content = (<>
    <div style={{minWidth:'130px'}}>Signed in as</div>
    <Typography.Title level={5} style={{color:'#57068C'}}>{loggedin}</Typography.Title>
    <Divider style={{marginTop:'5px', marginBottom:'5px'}}></Divider>
    <div className='header-me-button' onClick={() => handleButtonClick('/main/me/profile')}><UserOutlined style={{marginRight:'10px'}}/>Profile</div>
    <div className='header-me-button' onClick={() => handleButtonClick('/main/me/applies')}><SendOutlined style={{marginRight:'10px'}}/>My Applies</div>
    <div className='header-me-button' onClick={() => handleButtonClick('/main/me/posts')}><CloudUploadOutlined style={{marginRight:'10px'}}/>My Posts</div>
    <div className='header-me-button' onClick={() => handleButtonClick('/main/me/messages')}><MailOutlined style={{marginRight:'10px'}}/>Messages</div>
    <div className='header-me-button' onClick={() => handleButtonClick('/main/me/settings')} style={{paddingBottom:'0px'}}><SettingOutlined style={{marginRight:'10px'}}/>Settings</div>
  </>)

  const requireLogin = (<Button shape='round' type='primary' style={{marginTop:'60px'}}><Link to='/login'>Login or Register</Link></Button>)

  const handleButtonClick = (path) => {
    nav(path);
  }

  const handleAvatarClick = () => {

  }

  return (
    <div>
      <Popover content={loggedin === false?requireLogin: content} placement="bottomRight" overlayInnerStyle={{minHeight:'200px'}}>
        <div className='header-button header-me' style={{ backgroundColor: loggedin === false?'#DDDDDD':color }} onClick={handleAvatarClick}>{loggedin === false?'':nameToShort(loggedin) }</div>
      </Popover>
    </div>
  )
}
