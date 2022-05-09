import { Typography, Divider, Button, Skeleton, message, Modal, Input } from 'antd';
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PostCardSmall from '../PostCardSmall';
import Comment from './Comment';
import Api from '../../utils/Api';

import './index.css';
import { nameToShort } from '../../utils/utils';



export default function PostDetailed() {

  const { id } = useParams();
  const [replyActive, setReplyActive] = React.useState(-1);
  const [postData, setPostData] = React.useState(null);
  const [recommendData, setRecommendData] = React.useState(null);
  const [commentData, setCommentdata] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  var starting = React.useRef(true);
  const [showReply, setShowReply] = React.useState(false);
  const [replyContent, setReplyContent] = React.useState('')
  let nav = useNavigate();

  React.useEffect(() => {
    if (starting.current) {
      new Api('jobInfo', [id], convertPostData);
      new Api('recommendJobPost', [], convertRecommendData);
      new Api('jobComment', [id], convertCommentData);
      starting.current = false;
    }
  })

  React.useEffect(() => {
    if (!starting.current) {
      new Api('jobInfo', [id], convertPostData);
      new Api('recommendJobPost', [], convertRecommendData);
      new Api('jobComment', [id], convertCommentData);
      setPostData(null);
      setRecommendData(null);
      setCommentdata(null);
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

  const convertCommentData = (res) => {
    if (res.status === 'ok') {
      var original = res.comment;
      var converted = [];
      for (let i = 0; i < original.length; i++) {
        var currentFirstLayer = {
          id: original[i].id,
          targetId: null,
          username: original[i].name,
          email: original[i].student_email,
          userId: null,
          isFather: true,
          avatarBackgroundColor: original[i].color,
          avatarText: nameToShort(original[i].name),
          avatarImgUrl: null,
          content: original[i].content,
          publishedDate: original[i].datetime,
          like: original[i].like,
        }
        currentFirstLayer.children = []
        for (let j = 0; j < original[i].descendent.length; j++) {
          var originalSecondLayer = original[i].descendent[j];
          var currentSecondLayer = {
            id: originalSecondLayer.id,
            targetId: null,
            isFather: false,
            username: originalSecondLayer.name,
            userId: null,
            email: originalSecondLayer.student_email,
            publishedDate: originalSecondLayer.datetime,
            avatarBackgroundColor: originalSecondLayer.color,
            avatarText: nameToShort(originalSecondLayer.name),
            avatarImgUrl: null,
            content: originalSecondLayer.content,
            like: originalSecondLayer.like,
          }
          currentFirstLayer.children.push(currentSecondLayer)
        }
        converted.push(currentFirstLayer)
      }
      setCommentdata(converted)
    }
    else {
      message.error({ content: res.status, ket: 'message' })
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
    message.loading({ content: 'Preparing', key: 'message', duration: 1 });
    new Api('getUser', [], prepareApplyCallback);
  }

  const prepareApplyCallback = (res) => {
    if (res.status === 'ok') {
      message.loading({ content: 'Preparing', key: 'message', duration: 0.01 });
      setShowModal(true)
    }
    else {
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

  const reply = (content, rootId, commentId) => {
    console.log(content, rootId, commentId)
    if (content !== ''){
      new Api('createComment', [content, id, commentId, rootId], replyCallback)
      message.loading({content:'Please wait...', key:'message'})
    }
    else{
      message.error({content:'Reply content cannot be empty!', key:"message"})
    }
    
  }

  const replyCallback = (res) => {
    if (res.status === 'ok'){
      setShowReply(false);
      setReplyActive(-1);
      setCommentdata(null);
      message.success({content:'Comment Created!', key:'message'})
      new Api('jobComment', [id], convertCommentData);
    }
    else{
      message.error({content:res.status, key:'message'})
    }
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
                  <div style={{ marginTop: '0px', marginBottom: '5px', fontSize: '18px' }}>{postData.apply_end}</div>
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
        {showReply ?
          <Input.Group compact style={{ marginTop: '30px' }}>
            <Input.TextArea rows={2} placeholder="Comment to Post" onChange={(e) => setReplyContent(e.target.value)} />
            <Button style={{ marginTop: '5px', float: 'right' }} onClick={() =>reply(replyContent, null, null)}>Comment</Button>
          </Input.Group> : null}

        <Typography.Title level={5} style={{ marginTop: '30px', color: '#666666' }}>Comments</Typography.Title>
        <div style={{ width: '100%', marginTop: '10px', paddingTop: '10px', marginBottom: '100px' }} className='theme-box'>
          {commentData === null? <div style={{padding:'30px'}}><Skeleton active/><Skeleton active/><Skeleton active/></div>:<>
          {commentData.map((item) => {
            return <Comment data={item} replyActive={replyActive} setReplyActive={setReplyActive} replyFunc={reply} rootId={null}/>
          })}</>}
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
