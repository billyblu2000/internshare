import React from 'react';
import { Typography, Divider, Badge } from 'antd';
import './index.css';
const { Title, Text } = Typography;

export default function PostCard({ official }) {
  // const {avatar, title, description} = item;
  return (
    <>
      {official ?
        <Badge.Ribbon text="Official" color="volcano">
          <div style={{ minWidth: '100%', maxWidth: '100%', height: '80px', padding: '15px', marginBottom: '10px', marginTop: '10px' }} className='theme-box-hoverable'>
            <div style={{ backgroundColor: '#602929' }} className='postcard-avatar'>
              LY
            </div>
            <div style={{ float: 'left', marginLeft: '15px' }}>
              <div><Title style={{ marginBottom: '0px' }} level={5}>InternSHare<Divider type="vertical" style={{ backgroundColor: 'gray' }} />Frontend Developer</Title></div>
              <div><Text style={{ marginTop: '0px', width: '400px' }} ellipsis>Hello everyone, InternSHare is now hireing frontend developers! Feel free to apply this position.</Text></div>
            </div>
          </div>
        </Badge.Ribbon> :
        <div style={{ minWidth: '100%', maxWidth: '100%', height: '80px', padding: '15px', marginBottom: '10px', marginTop: '10px' }} className='theme-box-hoverable'>
          <div style={{ backgroundColor: '#602929' }} className='postcard-avatar'>
            LY
          </div>
          <div style={{ float: 'left', marginLeft: '15px' }}>
            <div><Title style={{ marginBottom: '0px' }} level={5}>InternSHare<Divider type="vertical" style={{ backgroundColor: 'gray' }} />Frontend Developer</Title></div>
            <div><Text style={{ marginTop: '0px', width: '400px' }} ellipsis>Hello everyone, InternSHare is now hireing frontend developers! Feel free to apply this position.</Text></div>
          </div>
        </div>
      }
    </>

  )
}
