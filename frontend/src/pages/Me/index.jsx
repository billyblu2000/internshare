import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import { UserOutlined, SettingOutlined, MailOutlined, CloudUploadOutlined, SendOutlined } from '@ant-design/icons';
import './index.css'
import Api from '../../utils/Api';

export default function Me() {

    const [selected, setSelected] = React.useState('');
    const nav = useNavigate();
    React.useEffect(() => {
        new Api('getUser', [], handleLogin)
    })

    const handleLogin = (res) => {
        if (res.status !== 'ok'){
            nav('/login')
        }
    }

    return (
        <div style={{ marginTop: '50px', verticalAlign:'top', marginBottom: '50px' }}>
            <div style={{ position:'fixed', width: '15%', paddingTop: '30px', minWidth:'200px' }}>
                {getDivButton('profile', 'Profile', selected, setSelected, nav, '/main/me/profile')}
                {getDivButton('applies', 'My Applies', selected, setSelected, nav, '/main/me/applies')}
                {getDivButton('posts', 'My Posts', selected, setSelected, nav, '/main/me/posts')}
                {getDivButton('messages', 'Messages', selected, setSelected, nav, '/main/me/messages')}
                {getDivButton('settings', 'Settings', selected, setSelected, nav, '/main/me/settings')}
            </div>
            <div style={{ marginLeft:'15%', width:'85%', marginTop:'80px' }}>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

function handleClick(changeStateFunc, changePathFunc, newPath, newState){
    changeStateFunc(newState);
    changePathFunc(newPath);
}


function getDivButton(name, display, selected, setSelected, nav, navPath) {
    return (
        <div 
            className={selected === name ? 'me-left-nav-button-selected' : 'me-left-nav-button'} 
            onClick={() => handleClick(setSelected, nav, navPath, name)}>
            <Typography.Title level={5} style={{ color: selected === name ? '#57068C' : 'black' }}>
                {name === 'profile'? <UserOutlined style={{ marginRight: '10px' }} />:null}
                {name === 'applies'? <SendOutlined style={{ marginRight: '10px' }} />:null}
                {name === 'posts'? <CloudUploadOutlined style={{ marginRight: '10px' }} />:null}
                {name === 'messages'? <MailOutlined style={{ marginRight: '10px' }} />:null}
                {name === 'settings'? <SettingOutlined style={{ marginRight: '10px' }} />:null}
                {display}
            </Typography.Title>
        </div>
    )
}