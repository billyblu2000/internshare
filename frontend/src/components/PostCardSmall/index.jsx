import React from 'react';
import { Typography, Divider, Badge } from 'antd';
import { Link } from 'react-router-dom';
import './index.css';
const { Title, Text } = Typography;

export default function PostCardSmall({ data }) {
  return (
    <Link to={`/main/post/${data.postId}`}>
          <div style={{ width:'100%', height: '80px', padding: '15px', marginBottom: '10px', marginTop: '10px' }} className='theme-box-hoverable'>
            <div style={{ backgroundColor: '#602929' }} className='postcardsmall-avatar'>
              LY
            </div>
            <div style={{ display:'inline-block',verticalAlign:'top', marginLeft: '15px' }}>
              <div><Title style={{ marginBottom: '0px' }} level={5}>test<Divider type="vertical" style={{ backgroundColor: 'gray' }} />test</Title></div>
              <div><Text style={{ marginTop: '0px', width:'100%' }} ellipsis>teafsafsafsaddffffffffgshf</Text></div>
            </div>
          </div>
    </Link>

  )
}
