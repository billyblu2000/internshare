import { Typography } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

const postData = {
  id: '',
  title: '',
  companyName: '',
  description: '',
  requirements: '',
  tags: ['', '', '',],
};
const commentData = [
  {
    id: '',
    targetId:'',
    isFather: true, // whether is commenting to post directly or not
  }
];

const recommendData = [
  
]

export default function PostDetailed() {
  const { id } = useParams();
  console.log(id);
  return (
    <div style={{ paddingLeft: '10%', paddingRight: '10%', marginTop: '100px' }}>
      <div style={{ float: 'left', width: '70%' }}>
        <div style={{ width: '100%', height: '100px' }} className='theme-box'></div>
        <Typography.Title level={5} style={{ marginTop: '50px', color: '#666666' }}>Comments</Typography.Title>
        <div style={{ width: '100%', height: '100px', marginTop: '20px' }} className='theme-box'></div>
      </div>
      <div style={{ float: 'left', width: '28%', marginLeft: '2%', }}>
        <Typography.Title level={5} style={{ color: '#666666', marginBottom: '20px' }}>You might also be interested in</Typography.Title>
        <div style={{ width: '100%', height: '100px' }} className='theme-box'></div>
        <div style={{ width: '100%', height: '100px' }} className='theme-box'></div>
      </div>
    </div>
  )
}
