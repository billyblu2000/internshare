import React from 'react'
import { Typography, Steps, Divider, Button, Tooltip } from 'antd'
import { SendOutlined,  EllipsisOutlined, CloseOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const { Title } = Typography;
const { Step } = Steps;

const singlePost = (
  <div style={{ minWidth: '100%', maxWidth: '100%', height: '80px', padding: '15px', marginBottom: '10px', marginTop: '10px' }}>
    <div style={{ backgroundColor: '#602929' }} className='postcard-avatar'>
      LY
    </div>
    <div style={{ float: 'left', marginLeft: '15px' }}>
      <Title style={{ marginBottom: '0px' }} level={5}>InternSHare</Title>
      <Title style={{ marginBottom: '0px', marginTop: '0px' }} level={4}>Frontend Developer</Title>
    </div>
    <div style={{float:'right', marginTop:'13px'}}>
    <Tooltip title='Cancel Application'><Button shape='circle' size='small' className='comment-reply-button'><CloseOutlined /></Button></Tooltip>
    <Tooltip title='Go to Post'><Button shape='circle' style={{marginLeft:'10px'}} size='small' className='comment-reply-button'><ArrowRightOutlined /></Button></Tooltip>
    </div>
    <div style={{ marginLeft: '40%', maxWidth: '40%', marginTop:'10px' }}>
      <Steps>
        <Step status="finish" title="Apply Sent" icon={<SendOutlined />} />
        <Step status="process" title="Pending Review" icon={<EllipsisOutlined />} />
      </Steps>
    </div>
    
  </div>
)
export default function Applies() {
  return (
    <div style={{ marginLeft: '10%', marginRight: '10%' }}>
      <div className='theme-box' style={{ width: '100%', padding: '15px 30px 15px 30px' }}>
        {singlePost}
        <Divider></Divider>
        {singlePost}
        <Divider></Divider>
        {singlePost}
      </div>
      <div style={{textAlign:'center', marginTop:'30px'}}>
        <Link to='/main/search'><Button shape='round'>Apply more Positions</Button></Link>
      </div>
    </div>
    
  )
}
