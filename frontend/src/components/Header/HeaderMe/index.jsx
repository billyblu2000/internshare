import React from 'react';
import { Popover, Divider, Typography} from 'antd';
import { useNavigate} from 'react-router-dom';
import {UserOutlined, SettingOutlined, MailOutlined, CloudUploadOutlined, SendOutlined} from '@ant-design/icons';
import './index.css'



export default function HeaderMe() {

  let nav = useNavigate();

  const content = (<>
    <div style={{minWidth:'130px'}}>Signed in as</div>
    <Typography.Title level={5} style={{color:'#57068C'}}>User</Typography.Title>
    <Divider style={{marginTop:'5px', marginBottom:'5px'}}></Divider>
    <div className='header-me-button' onClick={() => handleButtonClick('/main/me/profile')}><UserOutlined style={{marginRight:'10px'}}/>Profile</div>
    <div className='header-me-button' onClick={() => handleButtonClick('/main/me/applies')}><SendOutlined style={{marginRight:'10px'}}/>My Applies</div>
    <div className='header-me-button' onClick={() => handleButtonClick('/main/me/posts')}><CloudUploadOutlined style={{marginRight:'10px'}}/>My Posts</div>
    <div className='header-me-button' onClick={() => handleButtonClick('/main/me/messages')}><MailOutlined style={{marginRight:'10px'}}/>Messages</div>
    <div className='header-me-button' onClick={() => handleButtonClick('/main/me/settings')} style={{paddingBottom:'0px'}}><SettingOutlined style={{marginRight:'10px'}}/>Settings</div>
  </>)

  const handleButtonClick = (path) => {
    nav(path);
  }

  const handleAvatarClick = () => {

  }

  return (
    <div>
      <Popover content={content} placement="bottomRight">
        <div className='header-button header-me' style={{ backgroundColor: '#DDDDDD' }} onClick={handleAvatarClick}></div>
      </Popover>
    </div>
  )
}
