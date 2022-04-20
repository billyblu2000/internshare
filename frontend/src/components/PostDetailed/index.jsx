import { Typography, Divider, Button } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import PostCardSmall from '../PostCardSmall';
import Comment from './Comment';

import './index.css';

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
    id: '1',
    targetId: '1',
    username: '',
    userId: '',
    isFather: true, // whether is commenting to post directly or not
    avatarBackgroundColor: '',
    avatarText: '',
    avatarImgUrl: '',
    content: '',
    publishedDate: '',
    likes: 0,
    children: [
      {
        id: '2',
        targetId: '1',
        isFather: false,
        username: '',
        userId: '',
        publishedDate: '',
        avatarBackgroundColor: '',
        avatarText: '',
        avatarImgUrl: '',
        content: '',
        likes: 0,
      },
      {
        id: '5',
        targetId: '1',
        isFather: false,
        username: '',
        userId: '',
        publishedDate: '',
        avatarBackgroundColor: '',
        avatarText: '',
        avatarImgUrl: '',
        content: '',
        likes: 0,
      }
    ]
  },
  {
    id: '3',
    targetId: '1',
    username: '',
    userId: '',
    isFather: true, // whether is commenting to post directly or not
    avatarBackgroundColor: '',
    avatarText: '',
    avatarImgUrl: '',
    content: '',
    publishedDate: '',
    likes: 0,
    children: [
      {
        id: '4',
        targetId: '3',
        isFather: false,
        username: '',
        userId: '',
        publishedDate: '',
        avatarBackgroundColor: '',
        avatarText: '',
        avatarImgUrl: '',
        content: '',
        likes: 0,
      }
    ]
  }
];

const recommendData = [
  {
    postId: 1,
    companyName: '',
    title: '',
    des: ''
  },
  {
    postId: 2,
    companyName: '',
    title: '',
    des: ''
  },
  {
    postId: 3,
    companyName: '',
    title: '',
    des: ''
  },
  {
    postId: 3,
    companyName: '',
    title: '',
    des: ''
  },
  {
    postId: 1,
    companyName: '',
    title: '',
    des: ''
  },
  {
    postId: 2,
    companyName: '',
    title: '',
    des: ''
  },
  {
    postId: 3,
    companyName: '',
    title: '',
    des: ''
  },
  {
    postId: 1,
    companyName: '',
    title: '',
    des: ''
  },
  {
    postId: 2,
    companyName: '',
    title: '',
    des: ''
  },
  {
    postId: 3,
    companyName: '',
    title: '',
    des: ''
  },
]

export default function PostDetailed() {

  const { id } = useParams();
  const [replyActive, setReplyActive] = React.useState(-1);

  console.log(id);
  return (
    <div style={{ paddingLeft: '10%', paddingRight: '10%', marginTop: '100px' }}>
      <div style={{ float: 'left', width: '70%' }}>
        <div style={{ width: '100%', paddingLeft: '5%', paddingRight: '5%', paddingTop: '20px', paddingBottom: '30px' }} className='theme-box'>
          <div style={{marginBottom:'50px', marginTop:'20px'}}>
            <div style={{ backgroundColor: '#003a8c' }} className='postdetail-avatar'>
              B
            </div>
            <div style={{display:'inline-block', verticalAlign:'top', marginLeft:'15px'}}>
            <Typography.Title level={5} style={{marginBottom:'0px'}}>InternSHare</Typography.Title>
            <Typography.Title level={3} style={{marginTop:'0px', marginBottom:'0px'}}>Frontend Developer</Typography.Title>
            <Divider style={{marginTop:'8px', marginBottom:'12px', backgroundColor:'#AAAAAA'}}></Divider>
            <div>
              <span className='postdetail-tag'>frontend</span><span className='postdetail-tag' style={{backgroundColor:'rgb(126, 91, 32)'}}>summer</span><span className='postdetail-tag'>tag3</span> <span className='postdetail-tag'>tag3</span> <span className='postdetail-tag'>tag3</span>
            </div>
            </div>
            <div style={{float:'right', textAlign:'right'}}>
            <div style={{color:'gray', fontSize:'12px'}}>Expected Salary</div>
            <div style={{marginTop:'0px', marginBottom:'5px', fontSize:'18px'}}>¥ 3000 - 4000</div>
            <div style={{color:'gray', fontSize:'12px', marginTop:'10px'}}>Apply Deadline</div>
            <div style={{marginTop:'0px', marginBottom:'5px', fontSize:'18px'}}>18 April</div>
            <div></div>
            </div>
          </div>
          <Typography.Title level={5} style={{ marginBottom: '0px', paddingBottom: '0px' }}><span style={{ backgroundColor: '#57068C', color: 'white', padding: '3px' }}>Job Description</span></Typography.Title>
          <Divider style={{ backgroundColor: '#57068C', marginTop: '0px' }}></Divider>
          <div>Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description JobJob Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description Job Description</div>
          <Typography.Title level={5} style={{ marginBottom: '0px', paddingBottom: '0px', marginTop: '20px' }}><span style={{ backgroundColor: '#57068C', color: 'white', padding: '3px' }}>Job Requirements</span></Typography.Title>
          <Divider style={{ backgroundColor: '#57068C', marginTop: '0px' }}></Divider>
          <div> Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements Requirements</div>
          <div style={{ textAlign: 'center', marginTop: '30px', }}>
            <Button type='primary' shape='round'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Apply&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
          </div>

        </div>
        <Typography.Title level={5} style={{ marginTop: '50px', color: '#666666' }}>Comments</Typography.Title>
        <div style={{ width: '100%', marginTop: '10px', paddingTop: '10px', marginBottom: '100px' }} className='theme-box'>
          {commentData.map((item) => {
            return <Comment data={item} replyActive={replyActive} setReplyActive={setReplyActive} />
          })}
        </div>
      </div>
      <div style={{ float: 'left', width: '28%', marginLeft: '2%', }}>
        <Typography.Title level={5} style={{ color: '#666666', marginBottom: '10px' }}>You might also be interested in</Typography.Title>
        {recommendData.map((item) => {
          return <PostCardSmall data={item}/>
        })}
      </div>
    </div>
  )
}
