import { Typography, Divider, Button, Skeleton, message, Modal, Input } from 'antd';
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PostCardSmall from '../PostCardSmall';
import Comment from './Comment';
import Api from '../../utils/Api';

import './index.css';
import { nameToShort } from '../../utils/utils';

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



export default function PostDetailed() {

  const { id } = useParams();
  const [replyActive, setReplyActive] = React.useState(-1);
  const [postData, setPostData] = React.useState(null);
  const [recommendData, setRecommendData] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  var starting = React.useRef(true);
  const [showReply, setShowReply] = React.useState(false);
  let nav = useNavigate();

  React.useEffect(() => {
    if (starting.current) {
      new Api('jobInfo', [id], convertPostData);
      new Api('recommendJobPost', [], convertRecommendData)
      starting.current = false;
    }
  })

  React.useEffect(() => {
    if (!starting.current){
      new Api('jobInfo', [id], convertPostData);
      new Api('recommendJobPost', [], convertRecommendData);
      setPostData(null);
      setRecommendData(null);
    }
  }, [id])

  const convertPostData = (res) => {
    if (res.status === 'ok') {
      setPostData(res.result)
    }
    else {
      message.error({ content: res.status, key: 'message' })
    }
  }

  const convertRecommendData = (res) => {
    if (res.status === 'ok') {
      setRecommendData(res.result)
    }
    else {
      message.error({ content: res.status, key: 'message' })
    }
  }

  const handleSendOnline = () => {
    message.loading({ content: 'Please wait...', key: 'message' })
    new Api('apply', [postData.id, 'profile', postData.student_email], applyCallback);
  }

  const handleSendPDF = () => {
    message.loading({ content: 'Please wait...', key: 'message' });
    new Api('apply', [postData.id, 'cv', postData.student_email], applyCallback);
  }

  const prepareApply = () => {
    message.loading({ content: 'Preparing', key: 'message', duration:1 });
    new Api('getUser', [], prepareApplyCallback);
  }

  const prepareApplyCallback = (res) => {
    if (res.status === 'ok'){
      message.loading({ content: 'Preparing', key: 'message', duration:0.01 });
      setShowModal(true)
    }
    else{
      nav('/login');
    }
  }

  const applyCallback = (res) => {
    if (res.status === 'ok') {
      message.success({ content: 'Application created!', key: 'message' })
      setShowModal(false);
    }
    else {
      message.error({ content: res.status, key: 'message' })
    }
  }

  const reply = () => {
    setShowReply(false);
  }

  return (
    <div style={{ paddingLeft: '10%', paddingRight: '10%', marginTop: '100px' }}>
      <div style={{ float: 'left', width: '70%' }}>
        <div style={{ width: '100%', paddingLeft: '5%', paddingRight: '5%', paddingTop: '20px', paddingBottom: '30px' }} className='theme-box'>
          {postData === null ? <><Skeleton active /> <Skeleton active /> <Skeleton active /> <Skeleton active /><Skeleton active /> <Skeleton active /></> :
            <>
              <Modal title="Apply Position" visible={showModal} onCancel={() => setShowModal(false)} footer={[
                <Button shape='round' onClick={() => setShowModal(false)}>Back</Button>,
                <Button type='primary' shape='round' onClick={handleSendOnline}>Send Online Profile</Button>,
                <Button type='primary' shape='round' onClick={handleSendPDF}>Send CV PDF</Button>,
              ]}>
                <p>You are about to apply position: <span style={{ fontWeight: 'bold' }}>{postData.title}</span></p>
                <p style={{ color: 'gray' }}>You have two options to apply: sending your CV PDF file or sending your online profile. If you choose to send your CV PDF file, your must upload the file in the <Link to='/main/me/profile'>profile page</Link>. Your document will be send to the publisher's email by our server. If you choose to apply by online profile, the <Link to={`/main/user/${postData.student_email}`}>publisher</Link> will be notified and authorized to view your online profile, even if you set your privacy preference to private.</p>
                <p style={{ fontWeight: 'bold' }}>Are you sure to continue?</p>
              </Modal>
              <div style={{ marginBottom: '50px', marginTop: '20px' }}>
                <div style={{ backgroundColor: postData.publisher_color }} className='postdetail-avatar'>
                  {nameToShort(postData.publisher_name)}
                </div>
                <div style={{ display: 'inline-block', verticalAlign: 'top', marginLeft: '15px' }}>
                  <Typography.Title level={5} style={{ marginBottom: '0px' }}>{postData.company_name}</Typography.Title>
                  <Typography.Title level={3} style={{ marginTop: '0px', marginBottom: '0px' }}>{postData.title}</Typography.Title>
                  <Divider style={{ marginTop: '8px', marginBottom: '12px', backgroundColor: '#AAAAAA' }}></Divider>
                  <div>
                    <span className='postdetail-tag'>tag1</span><span className='postdetail-tag' style={{ backgroundColor: 'rgb(126, 91, 32)' }}>tag2</span><span className='postdetail-tag' style={{ backgroundColor: 'rgb(42, 91, 89)' }} >tag3</span> <span className='postdetail-tag' style={{ backgroundColor: 'rgb(68, 14, 81)' }}>tag4</span> <span className='postdetail-tag' style={{ backgroundColor: 'rgb(110, 91, 58)' }}>tag5</span>
                  </div>
                </div>
                <div style={{ float: 'right', textAlign: 'right' }}>
                  <div style={{ color: 'gray', fontSize: '12px' }}>Expected Salary</div>
                  <div style={{ marginTop: '0px', marginBottom: '5px', fontSize: '18px' }}>{postData.salary}</div>
                  <div style={{ color: 'gray', fontSize: '12px', marginTop: '10px' }}>Apply Deadline</div>
                  <div style={{ marginTop: '0px', marginBottom: '5px', fontSize: '18px' }}>{postData.end_date}</div>
                  <div></div>
                </div>
              </div>
              <Typography.Title level={5} style={{ marginBottom: '0px', paddingBottom: '0px' }}><span style={{ backgroundColor: '#57068C', color: 'white', padding: '3px' }}>Job Description</span></Typography.Title>
              <Divider style={{ backgroundColor: '#57068C', marginTop: '0px' }}></Divider>
              <div>{postData.des}</div>
              <Typography.Title level={5} style={{ marginBottom: '0px', paddingBottom: '0px', marginTop: '20px' }}><span style={{ backgroundColor: '#57068C', color: 'white', padding: '3px' }}>Job Requirements</span></Typography.Title>
              <Divider style={{ backgroundColor: '#57068C', marginTop: '0px' }}></Divider>
              <div> {postData.requirement}</div>
              <div style={{ textAlign: 'center', marginTop: '30px', }}>
                <Button type='primary' shape='round' onClick={() => prepareApply()}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Apply&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
              </div>
              <div style={{ marginTop: '30px' }}>
                <Button type='dashed' style={{ width: '50%' }} onClick={() => nav(`/main/user/${postData.student_email}`)}>Go to Publisher's Profile</Button>
                <Button type='dashed' style={{ width: '50%' }} onClick={() => setShowReply(!showReply)}>Comment to this post</Button>
              </div>
            </>}


        </div>
        {showReply?
        <Input.Group compact style={{marginTop:'30px'}}>
          <Input.TextArea rows={2} placeholder="Comment to Post" />
          <Button style={{ marginTop: '5px', float: 'right' }} onClick={reply}>Comment</Button>
        </Input.Group> : null}

        <Typography.Title level={5} style={{ marginTop: '30px', color: '#666666' }}>Comments</Typography.Title>
        <div style={{ width: '100%', marginTop: '10px', paddingTop: '10px', marginBottom: '100px' }} className='theme-box'>
          {commentData.map((item) => {
            return <Comment data={item} replyActive={replyActive} setReplyActive={setReplyActive} />
          })}
        </div>
      </div>
      <div style={{ float: 'left', width: '28%', marginLeft: '2%', }}>
        <Typography.Title level={5} style={{ color: '#666666', marginBottom: '10px' }}>You might also be interested in</Typography.Title>
        {recommendData === null ? <><Skeleton active /><Skeleton active /><Skeleton active /><Skeleton active /><Skeleton active /></> : <>
          {recommendData.map((item) => {
            return <PostCardSmall data={item} />
          })}</>}

      </div>
    </div>
  )
}
