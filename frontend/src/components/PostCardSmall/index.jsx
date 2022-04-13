import React from 'react';
import { Typography, Divider, Badge } from 'antd';
import { Link } from 'react-router-dom';
import './index.css';
const { Title, Text } = Typography;

export default function PostCard({ official, data }) {
  return (
    <Link to={`/main/post/${data.postId}`}>
      {official ?
        <Badge.Ribbon text="Official" color="volcano">
          <div style={{ minWidth: '100%', maxWidth: '100%', height: '80px', padding: '15px', marginBottom: '10px', marginTop: '10px' }} className='theme-box-hoverable'>
            <div style={{ backgroundColor: '#602929' }} className='postcard-avatar'>
              LY
            </div>
            <div style={{ float: 'left', marginLeft: '15px' }}>
              <div><Title style={{ marginBottom: '0px' }} level={5}>{data.companyName}<Divider type="vertical" style={{ backgroundColor: 'gray' }} />{data.jobName}</Title></div>
              <div><Text style={{ marginTop: '0px', width: '400px' }} ellipsis>{data.jobDes}</Text></div>
            </div>
          </div>
        </Badge.Ribbon> :
        <div style={{ minWidth: '100%', maxWidth: '100%', height: '80px', padding: '15px', marginBottom: '10px', marginTop: '10px' }} className='theme-box-hoverable'>
          <div style={{ backgroundColor: '#602929' }} className='postcard-avatar'>
            LY
          </div>
          <div style={{ float: 'left', marginLeft: '15px' }}>
            <div><Title style={{ marginBottom: '0px' }} level={5}>{data.companyName}<Divider type="vertical" style={{ backgroundColor: 'gray' }} />{data.jobName}</Title></div>
            <div><Text style={{ marginTop: '0px', width: '400px' }} ellipsis>{data.jobDes}</Text></div>
          </div>
        </div>
      }
    </Link>

  )
}
